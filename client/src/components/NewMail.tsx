import { FileText, Mail, Send, Subtitles, X } from 'lucide-react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { UserProps, useUserContext } from '../contexts/UserContext';

interface NewMailProps {
  toggleWritingMail: () => void;
}

const NewMail = ({ toggleWritingMail }: NewMailProps) => {
  const { user, handleUserLoginRequest } = useUserContext();
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (
    recipient: string,
    subject: string,
    body: string
  ) => {
    if (!recipient || !subject || !body) {
      return toast.warning('Please fill all fields');
    }

    const responseRecipient = await fetch(
      `http://localhost:3000/users?email=${recipient}`,
      {
        method: 'GET',
      }
    );

    if (responseRecipient.status !== 200) {
      return toast.error('Recipient not found');
    }

    const recipientData: UserProps = await responseRecipient.json();

    const response = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: { body, subject },
        from: user?.id,
        to: recipientData.id,
      }),
    });

    if (response.status === 201) {
      setRecipient('');
      setSubject('');
      setBody('');
      toggleWritingMail();
      handleUserLoginRequest(user?.email || '');

      return toast.success('Message sent');
    }
  };

  return (
    <div className="h-[36rem] w-[40rem] flex flex-col gap-4 bg-gray-600 rounded-xl absolute bottom-2 right-2 p-4">
      <header className="flex w-full items-center justify-center">
        <div className="absolute top-1 left-1 hover:cursor-pointer rounded-full p-2 hover:bg-zinc-500">
          <X
            size={24}
            strokeWidth={1.5}
            color="white"
            onClick={toggleWritingMail}
          />
        </div>
        <h2 className="font-inter text-xl text-white text-semibold">
          Write new email
        </h2>
      </header>
      <div>
        <form className="flex flex-col gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail size={20} strokeWidth={1.5} color="#2DA4FF" />
            </div>
            <input
              type="text"
              className="border text-sm rounded-lg block w-full pl-10 p-2.5 outline-none bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="recipient@email.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Subtitles size={20} strokeWidth={1.5} color="#2DA4FF" />
            </div>
            <input
              type="text"
              className="border text-sm rounded-lg block w-full pl-10 p-2.5 outline-none bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 top-3 left-0 flex pl-3 pointer-events-none">
              <FileText size={20} strokeWidth={1.5} color="#2DA4FF" />
            </div>
            <textarea
              className="border text-sm rounded-lg block w-full h-[20rem] pl-10 p-2.5 outline-none bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(recipient, subject, body);
              }}
              className="flex items-center text-gray-300 gap-4 border-2 border-[#2DA4FF] max-w-fit rounded-lg py-2 px-6 absolute right-0 hover:bg-[#2DA4FF] transition-colors hover:text-white text-semibold"
            >
              <span>Send email</span>
              <Send size={20} strokeWidth={1.5} />
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export { NewMail };
