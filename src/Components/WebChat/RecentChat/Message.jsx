import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { messageDeliveryStatus } from "../../../Helpers/Chat/RecentChat";
import { isGroupChat } from '../../../Helpers/Chat/ChatHelper';
import { IconUploading } from "../../../assets/images";
import { MSG_PROCESSING_STATUS_ID, GROUP_CHAT_PROFILE_UPDATED_NOTIFY } from '../../../Helpers/Chat/Constant';
import { isLocalUser, formatGroupIdToJid } from "../../../Helpers/Chat/User";
import { useGetUpdatedMsgStatus, useGetTypingStatus } from "../../../CustomHooks/chat";
import SDK from "../../SDK";

const Message = (props) => {
  const {
    recentChatStatus: { id: statusId, data: statusData = {} } = {},
    typingData: { id: typingId, data = [] } = {},
    messageData = {}
  } = useSelector((store) => store);

  const { lastMessage, publisherId, deleteStatus,onClickHandler = null } = props;
  const { data: { msgId, msgStatus: msgUpdatedStatus } = {} } = messageData;
  const { messageId, chatUserType, fromUserId, msgStatus, msgType } = props;

  const lastMessageStatus = useGetUpdatedMsgStatus({messageStatus: msgStatus,
    messageId: messageId,
    messageDataMsgStatus: msgUpdatedStatus,
    messageDataMsgId: msgId,
    chatUserType,
    groupChatStatusId: statusId,
    groupChatStatusData: statusData
  });

  const { isTyping, displayName } = useGetTypingStatus({typingId, typingData: data, fromUserId, chatType: chatUserType});

  useEffect(() => {
    // Get group chat status for recent chat
    if (isGroupChat(chatUserType) && isLocalUser(publisherId) && msgType !== GROUP_CHAT_PROFILE_UPDATED_NOTIFY) {
      const groupJid = formatGroupIdToJid(fromUserId);
      SDK.getGroupMsgInfo(groupJid, messageId, true);
    }
  }, []);

  /**
   * handleMsgStatusIcon() method to handle the message status icon.
   * @param {string} status
   */
  const messageStatus = (lastmessageStatus, publisherid) => {
    if (isLocalUser(publisherid)) {
    return <i className={messageDeliveryStatus[lastmessageStatus]}>{lastmessageStatus === MSG_PROCESSING_STATUS_ID ? <IconUploading /> : ''}</i>;
    }
    return null;
  };

  const status = msgType === GROUP_CHAT_PROFILE_UPDATED_NOTIFY || deleteStatus === 1 ? null : messageStatus(lastMessageStatus, publisherId);

  return (
    <span className="recentText" onClick={onClickHandler ? onClickHandler : null}>
      {isTyping ? (
        <span className="txtTyping">{displayName}</span>
      ) : (
        <>
          {lastMessage && (
            <>
              {status} {lastMessage}
            </>
          )}
        </>
      )}
    </span>
  );
};

export default Message;
