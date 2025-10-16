import { useNavigate } from "react-router-dom";
import type { Club } from "../interfaces/clubs/Club";
import { deleteClub, likeUnlikeClub } from "../services/clubsService";
import { errorMessage, successMessage } from "../utils/ui/alert";
import { getUser } from "../utils/storage";

interface UseClubActionsProps {
  onRemoveFromView: (clubId: string) => void;
  onLikeToggle: (clubId: string, newLikeState: boolean) => void;
  shouldRemoveOnUnlike?: boolean;
}

export const useClubActions = ({
  onRemoveFromView,
  onLikeToggle,
  shouldRemoveOnUnlike = false,
}: UseClubActionsProps) => {
  const navigate = useNavigate();

  const handleClubClick = (club: Club) => {
    navigate(`/ClubDetails/${club._id}`, { state: club });
  };
  const handleClubDelete = async (club: Club) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this club?"
    );

    if (!isConfirmed) return;

    try {
      const deleteClubResponse = await deleteClub(club._id!);
      onRemoveFromView(club._id!);
      successMessage(`${deleteClubResponse.data.name} deleted successfully`);
    } catch (error: any) {
      if (error.response.data) {
        errorMessage(`Failed to delete club: ${error.response.data}`);
      } else {
        errorMessage("Failed to delete club");
      }
    }
  };

  const handleClubEditClick = (club: Club) => {
    navigate(`/clubs/${club._id}/edit`, { state: club });
  };

  const handleLikeUnlikeClick = async (club: Club) => {
    const user = getUser();
    try {
      const wasLiked = club.likes?.includes(user._id);
      await likeUnlikeClub(club._id!);

      const newLikeState = !wasLiked;
      onLikeToggle(club._id!, newLikeState);

      if (wasLiked && shouldRemoveOnUnlike) {
        onRemoveFromView(club._id!);
      }
    } catch (error: any) {
      if (error.response.data) {
        errorMessage(`Failed to like/unlike club: ${error.response.data}`);
      } else {
        errorMessage("Failed to like/unlike club");
      }
    }
  };
  return {
    handleClubClick,
    handleClubDelete,
    handleClubEditClick,
    handleLikeUnlikeClick,
  };
};
