import toast, { Toaster } from "react-hot-toast";

const notify = () => {
  const notify = () => toast.success('Here is your toast.');
  return (
    <>
      <Toaster />
    </>
  )
};

export default notify;
