import React from "react";
import "../Chat.css";

const Chat = () => {
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
              // TODO: 实现搜索功能
            />
          </div>

          {/* 联系人项 */}
          <div className="contact-item active">
            <div className="contact-details">
              <h3 className="contact-name">Luna</h3>
              <p className="last-message">Are we meeting today?</p>
            </div>
            <div className="contact-meta">
              <span className="msg-time">10:42</span>
              <span className="unread-badge">1</span>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-details">
              <h3 className="contact-name">Oliver</h3>
              <p className="last-message">Thanks for your help! 😊</p>
            </div>
            <div className="contact-meta">
              <span className="msg-time">Yesterday</span>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-details">
              <h3 className="contact-name">Emma</h3>
              <p className="last-message">I'll send the files later</p>
            </div>
            <div className="contact-meta">
              <span className="msg-time">May 20</span>
            </div>
          </div>
        </div>

        {/* 右侧：聊天区域 */}
        <div className="chat-area">
          {/* 聊天头部 - 显示当前联系人信息 */}
          <div className="chat-header">
            <div>
              <h2 className="current-chat-name">Luna</h2>
              <p className="online-indicator">Online now</p>
            </div>
            <button className="options-btn" aria-label="Options">
              ⋮
            </button>
            {/* TODO: 实现更多选项下拉菜单 */}
          </div>

          {/* 消息展示区域 */}
          <div className="message-area">
            {/* 日期分隔线 */}
            <div className="time-separator">Today, 10:30 AM</div>

            {/* 接收的消息 */}
            <div className="message incoming">
              <div className="message-content">
                Good morning! Did you see my email?
              </div>
              <span className="message-timestamp">10:35</span>
            </div>

            {/* 发送的消息 */}
            <div className="message outgoing">
              <div className="message-content">
                Hi! Yes, just checked it. I'll reply soon.
              </div>
              <span className="message-timestamp">10:37</span>
            </div>

            {/* 接收的消息 */}
            <div className="message incoming">
              <div className="message-content">Are we meeting today?</div>
              <span className="message-timestamp">10:42</span>
            </div>

            {/* TODO: 
              1. 集成WebSocket接收消息功能
              2. 实现Node.js消息历史记录加载
              3. 添加自动滚动到底部功能
            */}
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
              <button className="action-icon" aria-label="Emoji">
                😊
              </button>
              {/* TODO: 实现附件、图片、表情功能 */}
            </div>
            <textarea
              className="message-input"
              placeholder="Type your message..."
              // TODO: 实现输入框高度自适应
            ></textarea>
            <button className="send-button">Send</button>
            {/* TODO: 
              1. 实现WebSocket发送消息
              2. 支持Enter键发送
              3. 输入验证
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
