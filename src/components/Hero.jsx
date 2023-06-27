import { useEffect, useState } from "react";
import { MdNotes } from "react-icons/md";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return [];
  }
};

const Hero = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState(getLocalStorage());
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const submitData = (e) => {
    e.preventDefault();
    if (!title && !description) {
      showAlert(true, "Please fill the form", "error");
    } else if (!description) {
      showAlert(true, "Please fill the description", "error");
    } else if (!title) {
      showAlert(true, "Please fill the title", "error");
    } else if (title && description && isEditing) {
      showAlert(true, "Please fill the description", "error");
      setData(
        data.map((item) => {
          if (item.id === editId) {
            return { ...item, title, description };
          }
          return item;
        })
      );

      setIsEditing(false);
      setEditId(null);
      showAlert(true, "success", "success");
      setIsEditing(false);
      setDescription("");
      setTitle("");
    } else {
      const newData = {
        id: new Date().getTime().toString(),
        title,
        description,
      };
      setData((prevData) => [...prevData, newData]);
      showAlert(true, "Success", "success");

      setDescription("");
      setTitle("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const removeAll = () => {
    setData([]);
    showAlert(true, "Remove all notes", "success");
  };

  const removeItem = (id) => {
    showAlert(true, "Remove note", "success");
    setData(data.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = data.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);

    setTitle(specificItem.title);
    setDescription(specificItem.description);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <div className="max-w-[700px] mx-auto text-white flex flex-col items-center mt-[70px] lg:mt-14 ">
        {alert.show && <Alert {...alert} removeAlert={showAlert} data={data} />}
        <div className=" w-[90%] mx-2 rounded-lg p-4">
          <h1 className="font-bold text-3xl my-2 flex items-center gap-2">
            My notes <MdNotes />
          </h1>
          <form className="flex flex-col " onSubmit={submitData}>
            <input
              type="text"
              className="text-black w-full py-1 px-2 mr-4 rounded-md mb-2 "
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="text-black w-full py-1 px-2 mr-4 rounded-md"
              placeholder="Enter your notes"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="font-medium text-center mt-2  border-2 border-white rounded-lg py-1"
              type="submit"
            >
              Submit
            </button>
          </form>
          <div>
            <List items={data} removeItem={removeItem} editItem={editItem} />
          </div>
          {data.length > 0 && (
            <button
              className="w-full font-medium text-center mt-2 bg-red-400 rounded-lg py-1"
              onClick={removeAll}
            >
              Clear all
            </button>
          )}
        </div>
        <div className="absolute bottom-[5%] ">
          <h1 className="text-sm">
            {" "}
            © 2023 Made by{" "}
            <a
              href="https://www.facebook.com/CreatorVayne/"
              className="underline"
            >
              Ogama
            </a>{" "}
          </h1>
          <div className="flex justify-center gap-3 mt-4">
            <a href="https://www.linkedin.com/in/johnogama/">
              <BsLinkedin size={20} />
            </a>
            <a href="https://github.com/JohnOGama">
              <BsGithub size={20} />
            </a>
            <a href="https://www.tiktok.com/@xandeveloper">
              <FaTiktok size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
