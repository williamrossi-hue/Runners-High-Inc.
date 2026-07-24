import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  signOut
} from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive.readonly");

let cachedAccessToken: string | null = null;

export function extractDriveFileId(input: string): string | null {
  if (!input) return null;
  const fileDMatch = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch) return fileDMatch[1];

  const dMatch = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch) return dMatch[1];

  const idMatch = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];

  if (/^[a-zA-Z0-9_-]{20,}$/.test(input.trim())) {
    return input.trim();
  }

  return null;
}

export function formatDriveImageUrl(input: string, fallbackUrl: string = ""): string {
  if (!input) return fallbackUrl;
  
  // Direct lh3 link or standard image URL
  if (input.startsWith("https://lh3.googleusercontent.com/d/")) {
    return input;
  }
  
  const fileId = extractDriveFileId(input);
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  return input || fallbackUrl;
}

export const initAuthListener = (
  onSuccess?: (user: User, token: string) => void,
  onLogout?: () => void
) => {
  return onAuthStateChanged(auth, (user) => {
    if (user && cachedAccessToken) {
      if (onSuccess) onSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onLogout) onLogout();
    }
  });
};

export const signInWithGoogleDrive = async (): Promise<{ user: User; accessToken: string }> => {
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (!credential?.accessToken) {
    throw new Error("Could not retrieve Google Drive access token.");
  }
  cachedAccessToken = credential.accessToken;
  return { user: result.user, accessToken: cachedAccessToken };
};

export const logoutUser = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export const searchDriveFiles = async (
  accessToken: string,
  searchTerms: string[]
): Promise<Record<string, string>> => {
  try {
    const results: Record<string, string> = {};
    for (const term of searchTerms) {
      const query = encodeURIComponent(`name contains '${term}' and trashed = false`);
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,webViewLink)&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (!response.ok) {
        console.warn(`Drive API search failed for term ${term}:`, response.statusText);
        continue;
      }
      
      const data = await response.json();
      if (data.files && data.files.length > 0) {
        // Find exact or closest match
        const file = data.files.find(
          (f: any) => f.name.toLowerCase().includes(term.toLowerCase())
        ) || data.files[0];
        
        results[term] = `https://lh3.googleusercontent.com/d/${file.id}`;
      }
    }
    return results;
  } catch (error) {
    console.error("Error searching Google Drive:", error);
    return {};
  }
};
