import React, { useState, useEffect, useRef } from "react";
import "../css/Chat.css";
import { useAuth } from "../main"; // 导入认证钩子获取用户信息

const Chat = () => {
  const { user } = useAuth(); // 获取当前登录用户
  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const messageIdRef = useRef(0);

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

  // WebSocket连接初始化
  const initWebSocketConnection = () => {
    if (!user) return;

    try {
      // 创建WebSocket连接
      const wsUrl = `ws://localhost:5000`;
      wsRef.current = new WebSocket(wsUrl);

      // 连接打开
      wsRef.current.onopen = () => {
        console.log("WebSocket连接已建立");
        setIsConnected(true);

        // 发送用户登录信息
        wsRef.current.send(
          JSON.stringify({
            type: "login",
            userId: user.id,
          })
        );
      };

      // 接收消息
      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // 处理聊天消息
          if (data.type === "chat") {
            handleIncomingMessage(data.from, data.content, data.timestamp);
          }

          // 处理消息送达确认
          if (data.type === "delivered") {
            console.log(`消息 ${data.messageId} 已送达`);
          }

          // 处理用户状态变化
          if (data.type === "userStatus") {
            updateUserStatus(data.userId, data.online);
          }
        } catch (error) {
          console.error("解析WebSocket消息出错:", error);
        }
      };

      // 连接关闭
      wsRef.current.onclose = () => {
        console.log("WebSocket连接已关闭");
        setIsConnected(false);
      };

      // 连接错误
      wsRef.current.onerror = (error) => {
        console.error("WebSocket连接错误:", error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error("初始化WebSocket连接失败:", error);
    }
  };

  // 关闭WebSocket连接
  const closeWebSocketConnection = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
      console.log("WebSocket连接已手动关闭");
    }
  };

  // 发送消息到服务器
  const sendMessageToServer = (contactId, content) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket连接未建立或已关闭");
      return;
    }

    const messageId = ++messageIdRef.current;

    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        to: contactId,
        content: content,
        messageId: messageId,
        timestamp: new Date().toISOString(),
      })
    );

    return messageId;
  };

  // 处理收到的消息
  const handleIncomingMessage = (fromUserId, content, timestamp) => {
    // 找到对应的联系人
    const contact = contacts.find(
      (c) => c.id.toString() === fromUserId.toString()
    );
    if (!contact) return;

    const localTimestamp = new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg = {
      id: conversations[fromUserId] ? conversations[fromUserId].length + 1 : 1,
      content: content,
      timestamp: localTimestamp,
      incoming: true,
    };

    // 更新会话消息
    setConversations((prevConversations) => ({
      ...prevConversations,
      [fromUserId]: [...(prevConversations[fromUserId] || []), newMsg],
    }));

    // 更新联系人列表中的最后一条消息和未读数
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.id.toString() === fromUserId.toString()
          ? {
              ...c,
              lastMessage: content,
              time: localTimestamp,
              unread: c.id === selectedContact.id ? c.unread : c.unread + 1,
            }
          : c
      )
    );
  };

  // 更新用户在线状态
  const updateUserStatus = (userId, online) => {
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c?.id && userId && c.id.toString() === userId.toString()
          ? { ...c, online: online }
          : c
      )
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

    // 通过WebSocket发送消息到服务器
    sendMessageToServer(selectedContact.id, newMessage);

    setNewMessage("");
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

  // 从localStorage加载数据
  const loadDataFromStorage = () => {
    if (!user) return;

    try {
      // 加载联系人数据
      const savedContacts = localStorage.getItem(
        `chat_contacts_${user.username}`
      );
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      }

      // 加载会话数据
      const savedConversations = localStorage.getItem(
        `chat_conversations_${user.username}`
      );
      if (savedConversations) {
        setConversations(JSON.parse(savedConversations));
      }

      // 加载选中联系人ID
      const savedSelectedContactId = localStorage.getItem(
        `chat_selected_contact_${user.username}`
      );
      if (savedSelectedContactId) {
        const contactId = parseInt(savedSelectedContactId);
        const contact = savedContacts
          ? JSON.parse(savedContacts).find((c) => c.id === contactId)
          : null;
        if (contact) {
          setSelectedContact(contact);
        }
      }

      console.log("从localStorage加载数据成功");
    } catch (error) {
      console.error("从localStorage加载数据失败:", error);
    }
  };

  // 保存数据到localStorage
  const saveDataToStorage = () => {
    if (!user) return;

    try {
      // 保存联系人数据
      localStorage.setItem(
        `chat_contacts_${user.username}`,
        JSON.stringify(contacts)
      );

      // 保存会话数据
      localStorage.setItem(
        `chat_conversations_${user.username}`,
        JSON.stringify(conversations)
      );

      // 保存选中联系人ID
      if (selectedContact) {
        localStorage.setItem(
          `chat_selected_contact_${user.username}`,
          selectedContact.id.toString()
        );
      }

      console.log("数据已保存到localStorage");
    } catch (error) {
      console.error("保存数据到localStorage失败:", error);
    }
  };

  // 组件挂载时从localStorage加载数据
  useEffect(() => {
    loadDataFromStorage();
  }, [user]); // 当用户变化时重新加载数据

  // 当contacts或conversations变化时保存到localStorage
  useEffect(() => {
    // 延迟保存，避免频繁写入
    const saveTimer = setTimeout(() => {
      saveDataToStorage();
    }, 300);

    return () => clearTimeout(saveTimer);
  }, [contacts, conversations, selectedContact, user]);

  // WebSocket连接初始化
  useEffect(() => {
    if (user) {
      initWebSocketConnection();
      return () => closeWebSocketConnection();
    }
  }, [user]); // 当用户信息变化时重新连接

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
