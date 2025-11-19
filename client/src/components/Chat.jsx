import React, { useState, useEffect, useRef } from "react";
import "../Chat.css";

const Chat = () => {
  // 多聊天会话数据结构
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Luna",
      lastMessage: "Are we meeting today?",
      time: "10:42",
      unread: 1,
      online: true,
    },
    {
      id: 2,
      name: "Oliver",
      lastMessage: "Thanks for your help! 😊",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Emma",
      lastMessage: "I'll send the files later",
      time: "May 20",
      unread: 0,
      online: true,
    },
  ]);

  // 每个联系人独立的消息列表
  const [conversations, setConversations] = useState({
    1: [
      {
        id: 1,
        content: "Good morning! Did you see my email?",
        timestamp: "10:35",
        incoming: true,
      },
      {
        id: 2,
        content: "Hi! Yes, just checked it. I'll reply soon.",
        timestamp: "10:37",
        incoming: false,
      },
      {
        id: 3,
        content: "Are we meeting today?",
        timestamp: "10:42",
        incoming: true,
      },
    ],
    2: [
      {
        id: 1,
        content: "Hey there!",
        timestamp: "Yesterday",
        incoming: false,
      },
      {
        id: 2,
        content: "Thanks for your help! 😊",
        timestamp: "Yesterday",
        incoming: true,
      },
    ],
    3: [
      {
        id: 1,
        content: "Can you send me the files?",
        timestamp: "May 20",
        incoming: false,
      },
      {
        id: 2,
        content: "I'll send the files later",
        timestamp: "May 20",
        incoming: true,
      },
    ],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messageAreaRef = useRef(null);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);

  // 过滤联系人
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 处理搜索输入
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 处理联系人选择，清除未读消息
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);

    // 清除该联系人的未读消息标识
    setContacts((prevContacts) =>
      prevContacts.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c))
    );
  };

  // 消息发送处理函数 - 支持多会话
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg = {
      id: conversations[selectedContact.id].length + 1,
      content: newMessage,
      timestamp: timestamp,
      incoming: false,
    };

    // 更新当前会话的消息列表
    setConversations((prevConversations) => ({
      ...prevConversations,
      [selectedContact.id]: [...prevConversations[selectedContact.id], newMsg],
    }));

    // 更新联系人列表中的最后一条消息
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.id === selectedContact.id
          ? { ...c, lastMessage: newMessage, time: timestamp }
          : c
      )
    );

    setNewMessage("");

    // TODO: WebSocket升级时，这里将发送消息到服务器
    // sendMessageToServer(selectedContact.id, newMessage);
  };

  // Enter键发送支持
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 输入框高度自适应
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    adjustTextareaHeight();
  };

  // 调整文本框高度
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px"; // 重置高度
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px"; // 设置新高度，最大120px
    }
  };

  // 表情包选择处理
  const handleEmojiSelect = (emoji) => {
    setNewMessage((prev) => prev + emoji);
    adjustTextareaHeight();
    setShowEmojiPicker(false);
  };

  // 点击外部关闭表情包选择器
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    // 添加事件监听器
    document.addEventListener("mousedown", handleClickOutside);

    // 清理函数
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [selectedContact.id, conversations[selectedContact.id]]);

  // TODO: localStorage存储功能 - 会话持久化
  useEffect(() => {
    // loadConversationsFromStorage();
  }, []);

  // TODO: WebSocket连接初始化
  useEffect(() => {
    // initWebSocketConnection();
    // return () => closeWebSocketConnection();
  }, []);

  return (
    <div className="chat-page">
      {/* 主聊天容器 - 不包含独立导航栏，使用项目已有导航 */}
      <div className="chat-container">
        {/* 左侧：联系人列表 */}
        <div className="contact-list">
          {/* 搜索栏 */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* 联系人项 */}
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-item ${
                selectedContact.id === contact.id ? "active" : ""
              }`}
              onClick={() => handleContactSelect(contact)}
            >
              <div className="contact-details">
                <h3 className="contact-name">
                  {contact.name}
                  {contact.online && <span className="online-dot">●</span>}
                </h3>
                <p className="last-message">{contact.lastMessage}</p>
              </div>
              <div className="contact-meta">
                <span className="msg-time">{contact.time}</span>
                {contact.unread > 0 && (
                  <span className="unread-badge">{contact.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 右侧：聊天区域 */}
        <div className="chat-area">
          {/* 聊天头部 - 显示当前联系人信息 */}
          <div className="chat-header">
            <div>
              <h2 className="current-chat-name">{selectedContact.name}</h2>
              <p className="online-indicator">
                {selectedContact.online ? "Online now" : "Offline"}
              </p>
            </div>
            <button className="options-btn" aria-label="Options">
              ⋮
            </button>
          </div>

          {/* 消息展示区域 */}
          <div className="message-area" ref={messageAreaRef}>
            {/* 日期分隔线 */}
            <div className="time-separator">Today, 10:30 AM</div>

            {/* 渲染当前会话的消息 */}
            {conversations[selectedContact.id]?.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.incoming ? "incoming" : "outgoing"
                }`}
              >
                <div className="message-content">{message.content}</div>
                <span className="message-timestamp">{message.timestamp}</span>
              </div>
            ))}
          </div>

          {/* 消息输入区域 */}
          <div className="input-area">
            <div className="input-actions">
              <button className="action-icon" aria-label="Attach file">
                📎
              </button>
              <button className="action-icon" aria-label="Photo">
                🖼️
              </button>
              <button
                ref={emojiButtonRef}
                className="action-icon"
                aria-label="Emoji"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😊
              </button>
            </div>
            <textarea
              ref={textareaRef}
              className="message-input"
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              style={{ height: "48px", overflow: "hidden" }}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>

            {/* 气泡式表情包选择面板 */}
            {showEmojiPicker && (
              <div className="emoji-picker" ref={emojiPickerRef}>
                <div className="emoji-grid">
                  {[
                    "😀",
                    "😃",
                    "😄",
                    "😁",
                    "😆",
                    "😅",
                    "😂",
                    "🤣",
                    "😊",
                    "😇",
                    "🙂",
                    "🙃",
                    "😉",
                    "😌",
                    "😍",
                    "🥰",
                    "😘",
                    "😗",
                    "😙",
                    "😚",
                    "😋",
                    "😛",
                    "😝",
                    "😜",
                    "🤪",
                    "🤨",
                    "🧐",
                    "🤓",
                    "😎",
                    "🤩",
                    "🥳",
                    "😏",
                    "😒",
                    "😞",
                    "😔",
                    "😟",
                    "😕",
                    "🙁",
                    "☹️",
                    "😣",
                    "😖",
                    "😫",
                    "😩",
                    "🥺",
                    "😢",
                    "😭",
                    "😤",
                    "😠",
                    "😡",
                    "🤬",
                    "🤯",
                    "😳",
                    "🥵",
                    "🥶",
                    "😱",
                    "😨",
                    "😰",
                    "😥",
                    "😓",
                    "🤗",
                    "🤔",
                    "🤭",
                    "🤫",
                    "🤥",
                    "😶",
                    "😐",
                    "😑",
                    "😬",
                    "🙄",
                    "😯",
                  ].map((emoji, index) => (
                    <button
                      key={index}
                      className="emoji-item"
                      onClick={() => handleEmojiSelect(emoji)}
                      aria-label={`Emoji ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
