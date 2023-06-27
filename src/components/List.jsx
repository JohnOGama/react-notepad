import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";

const List = ({ items, removeItem, editItem }) => {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 gap-3 lg:mt-3 mt-5 ">
        {items.map((item) => {
          const { title, id, description } = item;
          return (
            <>
              <div
                key={id}
                className="rounded-md px-4 py-2 h-auto bg-[#FFEB95] my-3 flex-1 relative"
              >
                <h1
                  className="text-black font-bold text-lg capitalize"
                  key={id}
                >
                  {title}
                </h1>
                <h1 key={id} className="text-black/80 text-sm leading-4">
                  {description}
                </h1>
                <div className=" flex my-2 absolute top-0 right-3">
                  <button className="text-black">
                    <BiEdit size={20} onClick={() => editItem(id)} />
                  </button>
                  <button className="text-red-500">
                    <AiTwotoneDelete size={20} onClick={() => removeItem(id)} />
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default List;
