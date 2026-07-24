import React, { useState, useEffect } from "react";
import { 
  HardDrive, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Key
} from "lucide-react";
import { 
  signInWithGoogleDrive, 
  searchDriveFiles, 
  formatDriveImageUrl, 
  extractDriveFileId,
  logoutUser 
} from "../lib/drive";

interface DriveImageManagerProps {
  isOpen: boolean;
  onClose: () => void;
  phoenixJourneyUrl: string;
  setPhoenixJourneyUrl: (url: string) => void;
  groupPhotoUrl: string;
  setGroupPhotoUrl: (url: string) => void;
}

export const DriveImageManager: React.FC<DriveImageManagerProps> = ({
  isOpen,
  onClose,
  phoenixJourneyUrl,
  setPhoenixJourneyUrl,
  groupPhotoUrl,
  setGroupPhotoUrl,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [phoenixInput, setPhoenixInput] = useState(phoenixJourneyUrl);
  const [groupInput, setGroupInput] = useState(groupPhotoUrl);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    setPhoenixInput(phoenixJourneyUrl);
    setGroupInput(groupPhotoUrl);
  }, [phoenixJourneyUrl, groupPhotoUrl, isOpen]);

  if (!isOpen) return null;

  const handleSaveLinks = () => {
    const formattedPhoenix = formatDriveImageUrl(phoenixInput);
    const formattedGroup = formatDriveImageUrl(groupInput);
    
    setPhoenixJourneyUrl(formattedPhoenix);
    setGroupPhotoUrl(formattedGroup);
    
    localStorage.setItem("runners_high_phoenix_journey", formattedPhoenix);
    localStorage.setItem("runners_high_group_photo", formattedGroup);
    
    setStatusMsg({ type: "success", text: "Image URLs updated and saved successfully!" });
    setTimeout(() => {
      onClose();
      setStatusMsg(null);
    }, 1200);
  };

  const handleAutoSearchDrive = async () => {
    setIsSearching(true);
    setStatusMsg({ type: "info", text: "Connecting to Google Drive to locate your images..." });
    try {
      const { accessToken } = await signInWithGoogleDrive();
      const driveResults = await searchDriveFiles(accessToken, ["Phoenix Journey", "Group Photo"]);
      
      let foundAny = false;
      if (driveResults["Phoenix Journey"]) {
        const url = driveResults["Phoenix Journey"];
        setPhoenixInput(url);
        setPhoenixJourneyUrl(url);
        localStorage.setItem("runners_high_phoenix_journey", url);
        foundAny = true;
      }
      if (driveResults["Group Photo"]) {
        const url = driveResults["Group Photo"];
        setGroupInput(url);
        setGroupPhotoUrl(url);
        localStorage.setItem("runners_high_group_photo", url);
        foundAny = true;
      }

      if (foundAny) {
        setStatusMsg({ type: "success", text: "Found matching images in your Google Drive!" });
      } else {
        setStatusMsg({ 
          type: "info", 
          text: "Drive connected! Please paste your shared Google Drive image links or file IDs below." 
        });
      }
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ 
        type: "error", 
        text: err.message || "Failed to search Drive. You can paste your Google Drive link or ID directly below." 
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-brand-navy hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-orange/20 text-brand-navy flex items-center justify-center shrink-0">
            <ImageIcon className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">Google Drive Image Settings</h2>
            <p className="text-sm text-slate-500">Configure public Google Drive images for Runner's High</p>
          </div>
        </div>

        {statusMsg && (
          <div className={`p-4 rounded-xl text-sm mb-6 flex items-start gap-3 ${
            statusMsg.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
            statusMsg.type === "error" ? "bg-rose-50 text-rose-800 border border-rose-200" :
            "bg-blue-50 text-blue-800 border border-blue-200"
          }`}>
            {statusMsg.type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> :
             statusMsg.type === "error" ? <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" /> :
             <RefreshCw className="w-5 h-5 text-blue-600 animate-spin shrink-0 mt-0.5" />}
            <p className="leading-relaxed">{statusMsg.text}</p>
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={handleAutoSearchDrive}
            disabled={isSearching}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white font-bold hover:bg-brand-orange hover:text-brand-navy transition-all flex items-center justify-center gap-3 shadow-md"
          >
            {isSearching ? <RefreshCw className="w-5 h-5 animate-spin" /> : <HardDrive className="w-5 h-5" />}
            {isSearching ? "Searching Google Drive..." : "Sign in & Auto-Detect Drive Images"}
          </button>
          <p className="text-xs text-slate-400 text-center mt-2">
            Automatically finds "Phoenix Journey.jpeg" and "Group Photo.jpeg" in your shared folder.
          </p>
        </div>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
          <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">or paste Google Drive links</span>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-brand-navy mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-orange" />
              Header / Banner Image ("Phoenix Journey.jpeg")
            </label>
            <div className="relative">
              <input
                type="text"
                value={phoenixInput}
                onChange={(e) => setPhoenixInput(e.target.value)}
                placeholder="Paste Google Drive Share Link or File ID..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm font-mono"
              />
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            {extractDriveFileId(phoenixInput) && (
              <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Direct preview URL ready (ID: {extractDriveFileId(phoenixInput)})
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-navy mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-orange" />
              Story Section Image ("Group Photo.jpeg")
            </label>
            <div className="relative">
              <input
                type="text"
                value={groupInput}
                onChange={(e) => setGroupInput(e.target.value)}
                placeholder="Paste Google Drive Share Link or File ID..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm font-mono"
              />
              <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            {extractDriveFileId(groupInput) && (
              <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Direct preview URL ready (ID: {extractDriveFileId(groupInput)})
              </p>
            )}
          </div>

          <div className="pt-4 flex gap-3">
            <button
              onClick={handleSaveLinks}
              className="flex-1 py-3 px-6 bg-brand-orange text-brand-navy font-bold rounded-xl hover:bg-brand-navy hover:text-white transition-all shadow-md"
            >
              Save & Apply Images
            </button>
            <button
              onClick={onClose}
              className="py-3 px-6 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
