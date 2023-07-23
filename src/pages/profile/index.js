/**
 * Author: Joseph Zhou
 * Created At: 20 Sep 2022
 */

/* eslint-disable */
import { useEffect, useState } from "react";

// api helper functions
import { getProfile, getMyTasks } from "api/fetch";

// react-router components
import { useParams, useNavigate } from "react-router-dom";

// Material Dashboard 2 React profile components
import ProfileLayout from "layouts/profile";

export default function Profile() {
  const { userid } = useParams();
  const navigate = useNavigate();
  const initProfile = {
    description: "",
    info: {
      fullName: "",
      mobile: "",
      email: "",
    },
    relation: "self",
    tags: [],
    imgs: { avatar: "" },
    connectionMsg: "",
    taskList: [],
  };
  const [profile, setProfile] = useState(initProfile);

  useEffect(async () => {
    try {
      let userID;
      console.log("userID is");
      console.log(userid === undefined);
      if (userid === undefined) {
        userID = localStorage.getItem("userId");
      } else {
        userID = userid;
      }
      console.log("userID is");
      console.log(userID);
      const { data } = await getProfile(userID);
      console.log(data);
      profile.description = data.user_sentence;
      profile.info.fullName = data.user_name;
      profile.info.mobile = data.user_mobile;
      profile.info.email = data.user_email;
      profile.relation = data.relation;
      profile.tags = data.tags;
      profile.imgs.avatar = data.user_image;
      profile.connectionMsg = data.connection_message;
      profile.taskList = data.taskProfileVO.taskInfo_resVOS;

      setProfile({ ...profile });
    } catch (error) {
      // navigate("/profile");
    }
  }, [userid]);

  return <ProfileLayout {...profile} />;
}
