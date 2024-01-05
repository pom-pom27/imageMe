"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
interface IIndex {}

const Index = ({}: IIndex) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState<File>();

  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFile(e.target.files[0]);

    setIsFileSelected(true);

    console.log("file", e.target.files[0]);
  };

  return (
    <div className="flex flex-1 bg-gray-100 justify-center">
      <div className=" flex max-w-5xl justify-center w-full rounded-lg bg-white my-10 ">
        <form action="#" className="w-full flex p-16 py-14 flex-col gap-4">
          <div className="flex justify-center sm:justify-end order-last sm:order-first ">
            <button className="bg-red-500 p-3 px-4 rounded-full text-white font-semibold">
              Publish
            </button>
          </div>
          <div className="flex gap-10 flex-col sm:flex-row">
            <div className="w-full sm:max-w-[240px] h-[400px]  rounded-md bg-gray-400 flex justify-center items-center p-5 ">
              <div className="border border-gray-300 flex w-full h-full justify-center items-center rounded-md relative">
                <label
                  htmlFor="file"
                  className="flex justify-center flex-col items-center w-full h-full cursor-pointer"
                >
                  {isFileSelected && (
                    <Image
                      src={window.URL.createObjectURL(file!)}
                      alt="file preview"
                      fill
                      objectFit="contain"
                    />
                  )}
                  <div className="text-4xl text-gray-600">
                    <RiUploadCloudFill />
                  </div>
                  <div className=" text-gray-600">Click to Upload</div>

                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col w-full gap-8">
              <label
                htmlFor="title"
                className="flex flex-col gap-1 text-gray-600 cursor-pointer"
              >
                Title
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add your Title"
                  className="p-3 border-gray-300  rounded-xl border-2"
                />
              </label>
              <label
                htmlFor="description"
                className="flex flex-col gap-1 text-gray-600 cursor-pointer"
              >
                Description
                <textarea
                  placeholder="Add a detailed description"
                  name="description"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="p-3 border-gray-300  rounded-xl border-2"
                />
              </label>
              <label
                htmlFor="link"
                className="flex flex-col gap-1 text-gray-600 cursor-pointer"
              >
                Link
                <input
                  type="text"
                  name="link"
                  id="link"
                  placeholder="Add a link"
                  className="p-3 border-gray-300  rounded-xl border-2"
                  onChange={(e) => setLink(e.target.value)}
                />
              </label>
              <label
                htmlFor="tag"
                className="flex flex-col gap-1 text-gray-600 cursor-pointer"
              >
                Tag
                <input
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="Add a tag, like #improvement, #love, etc."
                  className="p-3 border-gray-300  rounded-xl border-2"
                  onChange={(e) => setTag(e.target.value)}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
