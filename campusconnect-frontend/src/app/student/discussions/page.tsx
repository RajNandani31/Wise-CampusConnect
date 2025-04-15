export default function DiscussionsPage() {
  const groups = [
    {
      code: "CS101",
      title: "Project Discussion",
      participants: 8,
      preview: "Has anyone started working on the final ...",
      unreadCount: 3,
      selected: true,
    },
    {
      code: "MATH201",
      title: "Study Group",
      participants: 5,
      preview: "I'm having trouble with the integration ...",
    },
    {
      code: "PHYS101",
      title: "Lab Report Help",
      participants: 12,
      preview: "Can someone explain how to calculate t ...",
    },
  ];

  const messages = [
    {
      id: 1,
      user: "SJ",
      name: "Samantha James",
      time: "Yesterday, 3:12 PM",
      text: "Yes, I've chosen my topic already. I'm working on machine learning applications in healthcare.",
    },
    {
      id: 2,
      user: "MB",
      name: "Michael Brown",
      time: "Yesterday, 4:42 PM",
      text: "I'm still deciding between web development and mobile app development. Any suggestions ?",
    },
    {
      id: 3,
      user: "You",
      time: "Today, 8:05 AM",
      self: true,
      text: "I'm planning to do something with data visualization. Does anyone know good libraries for that ?",
    },
    {
      id: 4,
      user: "SJ",
      name: "Sarah Johnson",
      time: "Today, 9:30 AM",
      text: "D3.js is pretty popular for data visualization. You might want to check that out.",
    },
  ];

  return (
    <div className="bg-[#fdf9f5] min-h-screen px-10 py-8">
      <h2 className="text-2xl font-semibold mb-4">Discussions</h2>
      <div className="flex gap-8">
        {/* Left: Group List */}
        <div className="w-1/3 space-y-4">
          <h3 className="text-lg font-medium">Your Discussion Groups</h3>
          {groups.map((group, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-4 cursor-pointer shadow-sm ${
                group.selected ? "border border-[#06235B] bg-white" : "bg-white"
              }`}
            >
              <div className="font-semibold">
                {group.code}: {group.title}
              </div>
              <div className="text-xs text-gray-500">
                {group.participants} participants
              </div>
              <div className="text-sm text-gray-600 truncate mt-1">
                {group.preview}
              </div>
              {group.unreadCount && (
                <span className="bg-[#06235B] text-white text-xs font-medium px-2 py-1 rounded-full float-right mt-2">
                  {group.unreadCount}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Right: Chat Area */}
        <div className="w-2/3 bg-white rounded-xl shadow p-6 flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <h4 className="text-lg font-medium">CS101: Project Discussion</h4>
              <p className="text-sm text-gray-500">8 participants</p>
            </div>
            <div className="max-h-[400px] overflow-y-auto space-y-6 pr-2 mt-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.self ? "justify-end" : "flex-col"}`}
                >
                  {!msg.self && (
                    <div className="text-xs font-medium text-gray-700">
                      {msg.user}
                    </div>
                  )}
                  <div
                    className={`max-w-md p-3 rounded-lg text-sm ${
                      msg.self
                        ? "bg-[#ecead5] text-[#2a2a2a] font-semibold"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {msg.self ? "You" : msg.name} · {msg.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="mt-6 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message ..."
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none"
            />
            <button className="bg-[#06235B] p-3 rounded-lg text-white hover:bg-[#041737]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10l9-6 9 6-9 6-9-6zm0 0v10l9-6 9 6V10"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
