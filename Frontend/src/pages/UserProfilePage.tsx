
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
   const { currentUser, isPending: isGetPending } = useGetMyUser();
  const { updateUser, isPending: isUpdatePending } = useUpdateMyUser();

  if (isGetPending) {
    return <span>Pending...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm
     currentUser={currentUser}
      onSave={updateUser}
      isPending={isUpdatePending}
    />
  );
};

export default UserProfilePage;