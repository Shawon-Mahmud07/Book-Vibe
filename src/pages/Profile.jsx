import { useState } from "react";
import { motion } from "framer-motion";
import { User2, Camera, Save, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MotionDiv = motion.div;

const Profile = () => {
  const { currentUser, updateUserProfile, deleteAccount, logout } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || "",
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleSave = async () => {
    if (!displayName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await updateUserProfile(displayName.trim(), currentUser.photoURL);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteAccount();
      await logout();
      toast.success("Account deleted");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        toast.error("Please sign out and sign in again before deleting");
      } else {
        toast.error("Failed to delete account");
      }
    } finally {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Profile Settings
        </h1>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8 p-5 bg-muted rounded-2xl border border-border">
          <div className="relative">
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt=""
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-accent-green-light flex items-center justify-center">
                <User2 className="w-8 h-8 text-accent-green" />
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {currentUser?.displayName || "User"}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentUser?.email}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {currentUser?.providerData?.[0]?.providerId === "google.com"
                ? "Signed in with Google"
                : "Signed in with Email"}
            </p>
          </div>
        </div>

        {/* Display Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full h-11 px-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
            placeholder="Your name"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-foreground text-background hover:bg-foreground/90 h-11 font-medium mb-10"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>

        {/* Danger Zone */}
        <div className="border border-red-500/30 rounded-2xl p-5">
          <h3 className="text-red-500 font-semibold mb-1">Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Deleting your account is permanent and cannot be undone.
          </p>

          {!showDelete ? (
            <Button
              variant="outline"
              onClick={() => setShowDelete(true)}
              className="border-red-500/30 text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDelete(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </Button>
            </div>
          )}
        </div>
      </MotionDiv>
    </div>
  );
};

export default Profile;
