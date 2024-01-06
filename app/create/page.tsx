"use client";
import firebaseApp from "@/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
interface IIndex {}

const Index = ({}: IIndex) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFile(e.target.files[0]);

    setIsFileSelected(true);

    console.debug("file", e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!session?.user) return;

    if (title.length === 0 || !file) return;

    const storageRef = ref(storage, `pinterest-post/${file?.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }

        setIsLoading(true);
      },
      (error) => {
        // Handle unsuccessful uploads
        debug("Error:" + error.cause);
      },
      () => {
        setIsLoading(false);

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          sendFormData(downloadURL);
        });
      }
    );
  };

  const sendFormData = async (imgUrl: string) => {
    const postId = Date.now().toString();

    const formData = {
      title,
      description,
      link,
      tag,
      imgUrl,
      userId: session?.user?.email,
      postId,
    };

    try {
      await setDoc(doc(db, "pinterest-post", postId), formData);
      router.push("/");
    } catch (error) {
      debug("Error: " + error);
    }
  };
  return (
    <div className="flex flex-1 bg-gray-100 justify-center">
      <div className=" flex max-w-5xl justify-center w-full rounded-lg bg-white my-10 ">
        <form action="#" className="w-full flex p-16 py-14 flex-col gap-4">
          <div className="flex justify-center sm:justify-end order-last sm:order-first ">
            {isLoading ? (
              <Image src="spin.svg" alt="loading" width={70} height={70} />
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFileUpload();
                }}
                className="bg-red-500 p-3 px-4 rounded-full text-white font-semibold hover:bg-red-600 active:bg-red-400"
              >
                Publish
              </button>
            )}
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
                    onChange={handleFileInput}
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
