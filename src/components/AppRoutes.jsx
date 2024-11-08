import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../contexts/authContext";

import AppLayout from "./AppLayout";

import ProtectedRoute from "./ProtectedRoute";

import LandingPage from "../pages/entry/LandingPage";

import PageNotFound from "../pages/error/PageNotFound";

import CreateAccount from "../pages/auth/CreateAccount";
import VerifyEmail from "../pages/auth/VerifyEmail";
import SignIn from "../pages/auth/SignIn";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Tasks from "../pages/tasks/Tasks";
import CreateTask from "../pages/tasks/CreateTask";
import TaskInfo from "../pages/tasks/TaskInfo";

import Groups from "../pages/groups/Groups";
import NewGroup from "../pages/groups/NewGroup";
import JoinGroup from "../pages/groups/JoinGroup";
import CreateGroup from "../pages/groups/CreateGroup";
import GroupInfo from "../pages/groups/GroupInfo";
import GroupTasks from "../pages/groups/GroupTasks";
import CreateGroupTask from "../pages/groups/CreateGroupTask";
import GroupTaskInfo from "../pages/groups/GroupTaskInfo";
import EditGroupName from "../pages/groups/EditGroupName";
import InviteGroupMember from "../pages/groups/InviteGroupMember";

import Profile from "../pages/profile/Profile";
import ProfileSettings from "../pages/profile/ProfileSettings";
import ChangePassword from "../pages/profile/ChangePassword";

import Notifications from "../pages/notifications/Notifications";

function AppRoutes() {
  const { token, userId } = useAuth();

  //set user authenticated if userId and token exists in local storage
  const isAuthenticated = Boolean(token && userId);
  //const isAuthenticated = true;

  return (
    <Routes>
      {/**** Route to profile page if user is authenticated else go to the landing page */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/tasks" replace /> : <LandingPage />
        }
      />

      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<AppLayout />}>
          <Route path="tasks">
            <Route index element={<Tasks />} />
            <Route path="createtask" element={<CreateTask />} />
            <Route path="task">
              <Route path=":taskId" element={<TaskInfo />} />
            </Route>
          </Route>
          <Route path="groups">
            <Route index element={<Groups />} />
            <Route path="newgroup" element={<NewGroup />} />
            <Route path="joingroup/:inviteCode?" element={<JoinGroup />} />
            <Route path="creategroup" element={<CreateGroup />} />
            <Route path="group">
              <Route path=":groupId" element={<GroupInfo />} />
              <Route path="edit/:groupId" element={<EditGroupName />} />
              <Route
                path="invitemembers/:groupId"
                element={<InviteGroupMember />}
              />
              <Route path="tasks">
                <Route path=":groupId" element={<GroupTasks />} />
                <Route path="createtask">
                  <Route path=":groupId" element={<CreateGroupTask />} />
                </Route>
              </Route>
              <Route path="task">
                <Route path=":groupId/:taskId" element={<GroupTaskInfo />} />
              </Route>
            </Route>
          </Route>
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="settings">
              <Route index element={<ProfileSettings />} />
              <Route path="changepassword" element={<ChangePassword />} />
            </Route>
          </Route>
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Route>

      <Route path="createaccount" element={<CreateAccount />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="verifyemail" element={<VerifyEmail />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="resetpassword" element={<ResetPassword />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
