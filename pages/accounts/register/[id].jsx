import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

export default function CompleteRegister() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [picture, setPicture] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const urlFetch = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const pathId = router.query.id;
    if (pathId) {
      const token = localStorage.getItem("token");
      const tokenInfo = JSON.parse(atob(token.split(".")[1]));
      const pathId = router.query.id;
      console.log("token info:", tokenInfo, "path id:", pathId);
      if (tokenInfo.id != pathId) {
        router.push("/");
      }
      setToken(token);
    }
  }, [router.query.id, router]);

  const onSubmit = (data) => {
    const dataObject = {
      name: data.name,
      lastname: data.lastname,
      phone: data.phone,
      birthday: new Date(data.birthday),
      sex: data.sex,
      aboutMe: data.aboutMe,
      emergencyContact: {
        name: data.emergencyContactName,
        lastname: data.emergencyContactLastname,
        phone: data.emergencyContactPhone,
        relationship: data.emergencyContactRelationship,
      },
      isInfoCompleted: true,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(dataObject));
    formData.append("folder", "users");
    formData.append("id", JSON.parse(atob(token.split(".")[1])).id);
    formData.append("image", picture);

    fetch(`${urlFetch}/users/${JSON.parse(atob(token.split(".")[1])).id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response: ", response);
        if (response.success) {
          toast.success("Usuario actualizado con éxito", { autoClose: 2000 });
          setTimeout(
            () =>
              router.push(
                `/profiles/${JSON.parse(atob(token.split(".")[1])).id}`
              ),
            2000
          );
        } else {
          toast.error("Error al actualizar el usuario");
        }
      })
      .catch(() => {
        alert("falló el fetch");
      });
  };

  return !token ? (
    <main className="mt-[114px] mb-[24px] h-[calc(100vh-90px)]"></main>
  ) : (
    <main className="mt-[114px] mb-[24px]">
      <ToastContainer
        position="top-center"
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
      {/* <div className="bg-[#FF6868] py-4 text-center">
        <h1 className="text-white text-[28px] font-medium font-[Raleway]">
          Completar Registro
        </h1>
      </div> */}
      <div className="lg:flex lg:justify-center">
        <div className="mx-4 rounded-2xl lg:max-w-7xl bg-white shadow-xl">
          <div className="bg-[#FF6868] py-4 text-center rounded-t-2xl">
            <h1 className="text-white text-[20px] md:text-[24px] lg:text-[28px] font-medium font-[Raleway]">
              Completar Registro
            </h1>
          </div>
          <div className="p-[24px]">
            <div className="border-b-[2px] border-[#FF6868]">
              <h2 className="text-[24px] pb-[4px] font-[Nunito] font-semibold text-[#2B2E4A]">
                Información General
              </h2>
            </div>
            <div className="lg:flex lg:items-start md:items-center lg:w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-2 pt-3  md:m-auto m-auto font-[Nunito] font-medium"
              >
                <div className="w-[200px] h-[200px] aspect-square rounded-full bg-[#F2F2F2] mx-auto border m-[12px] p-[12px] border-[#c1c1c1]">
                  {picture ? (
                    <img
                      src={URL.createObjectURL(picture)}
                      alt="Selected"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="h-full w-full object-cover rounded-full flex place-content-center items-center bg-white bg-opacity-40">
                      <p className="text-center text-slate-400 font-light mt-[8px]">
                        Aún no has cargado una imagen
                      </p>
                    </div>
                  )}
                </div>
                <div className="pb-4 w-full">
                  <label
                    forlabel="image"
                    className="block mb-2 text-lg font-medium"
                  >
                    Subir imagen:
                  </label>
                  <div className="flex justify-center bg-[#F2F2F2] border-[1px] border-slate-300 rounded-lg">
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="cursor-pointer p-[8px]"
                      {...register("picture", {
                        required: {
                          value: true,
                          message: "Subir imagen es requerido",
                        },
                        onChange: (e) => setPicture(e.target.files[0]),
                      })}
                    />
                  </div>
                  {errors.picture && (
                    <span className="text-red-500">
                      {errors.picture.message}
                    </span>
                  )}
                </div>
                {/* <div className="flex justify-center items-center hover:scale-[102%] w-fit mx-auto my-[20px] hover:shadow-lg rounded-full transition">
                  <svg
                    width="168"
                    height="168"
                    viewBox="0 0 168 168"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="84"
                      cy="84"
                      r="83.5"
                      fill="#F2F2F2"
                      stroke="#CFD8DC"
                    />
                    <circle cx="84" cy="84" r="72" fill="#E0E0E0" />
                    <path
                      d="M84 90.25C86.7614 90.25 89 88.0114 89 85.25C89 82.4886 86.7614 80.25 84 80.25C81.2386 80.25 79 82.4886 79 85.25C79 88.0114 81.2386 90.25 84 90.25Z"
                      fill="#455A64"
                    />
                    <path
                      d="M97.75 75.25H93.1406C92.9062 75.25 92.6156 75.0984 92.3891 74.8594L90.3625 71.6609C90.3305 71.6102 90.2947 71.5619 90.2555 71.5164C89.5555 70.7 88.6094 70.25 87.5938 70.25H80.4062C79.3906 70.25 78.4445 70.7 77.7445 71.5164C77.7053 71.5619 77.6695 71.6102 77.6375 71.6609L75.6109 74.8641C75.4375 75.0531 75.1937 75.2547 74.9375 75.2547V74.6297C74.9375 74.2982 74.8058 73.9802 74.5714 73.7458C74.337 73.5114 74.019 73.3797 73.6875 73.3797H71.8125C71.481 73.3797 71.163 73.5114 70.9286 73.7458C70.6942 73.9802 70.5625 74.2982 70.5625 74.6297V75.2547H70.25C69.2558 75.2557 68.3025 75.6511 67.5995 76.3542C66.8965 77.0572 66.501 78.0104 66.5 79.0047V94C66.501 94.9942 66.8965 95.9475 67.5995 96.6505C68.3025 97.3535 69.2558 97.749 70.25 97.75H97.75C98.7442 97.749 99.6975 97.3535 100.401 96.6505C101.104 95.9475 101.499 94.9942 101.5 94V79C101.499 78.0058 101.104 77.0525 100.401 76.3495C99.6975 75.6465 98.7442 75.251 97.75 75.25ZM84 92.75C82.5166 92.75 81.0666 92.3101 79.8332 91.486C78.5999 90.6619 77.6386 89.4906 77.0709 88.1201C76.5032 86.7497 76.3547 85.2417 76.6441 83.7868C76.9335 82.332 77.6478 80.9956 78.6967 79.9467C79.7456 78.8978 81.082 78.1835 82.5368 77.8941C83.9917 77.6047 85.4997 77.7532 86.8701 78.3209C88.2406 78.8886 89.4119 79.8499 90.236 81.0832C91.0601 82.3166 91.5 83.7666 91.5 85.25C91.4977 87.2384 90.7068 89.1448 89.3008 90.5508C87.8948 91.9568 85.9884 92.7477 84 92.75V92.75Z"
                      fill="#455A64"
                    />
                    <circle
                      cx="84"
                      cy="84"
                      r="72"
                      fill="#424242"
                      fillOpacity="0.7"
                    />
                    <path
                      d="M84 63.75C85.6569 63.75 87 62.4069 87 60.75C87 59.0931 85.6569 57.75 84 57.75C82.3431 57.75 81 59.0931 81 60.75C81 62.4069 82.3431 63.75 84 63.75Z"
                      fill="white"
                    />
                    <path
                      d="M92.25 54.75H89.4844C89.3438 54.75 89.1694 54.6591 89.0334 54.5156L87.8175 52.5966C87.7983 52.5661 87.7768 52.5371 87.7533 52.5098C87.3333 52.02 86.7656 51.75 86.1562 51.75H81.8438C81.2344 51.75 80.6667 52.02 80.2467 52.5098C80.2232 52.5371 80.2017 52.5661 80.1825 52.5966L78.9666 54.5184C78.8625 54.6319 78.7162 54.7528 78.5625 54.7528V54.3778C78.5625 54.1789 78.4835 53.9881 78.3428 53.8475C78.2022 53.7068 78.0114 53.6278 77.8125 53.6278H76.6875C76.4886 53.6278 76.2978 53.7068 76.1572 53.8475C76.0165 53.9881 75.9375 54.1789 75.9375 54.3778V54.7528H75.75C75.1535 54.7534 74.5815 54.9907 74.1597 55.4125C73.7379 55.8343 73.5006 56.4063 73.5 57.0028V66C73.5006 66.5965 73.7379 67.1685 74.1597 67.5903C74.5815 68.0121 75.1535 68.2494 75.75 68.25H92.25C92.8465 68.2494 93.4185 68.0121 93.8403 67.5903C94.2621 67.1685 94.4994 66.5965 94.5 66V57C94.4994 56.4035 94.2621 55.8315 93.8403 55.4097C93.4185 54.9879 92.8465 54.7506 92.25 54.75ZM84 65.25C83.11 65.25 82.24 64.9861 81.4999 64.4916C80.7599 63.9971 80.1831 63.2943 79.8425 62.4721C79.5019 61.6498 79.4128 60.745 79.5865 59.8721C79.7601 58.9992 80.1887 58.1974 80.818 57.568C81.4474 56.9387 82.2492 56.5101 83.1221 56.3365C83.995 56.1628 84.8998 56.2519 85.7221 56.5925C86.5443 56.9331 87.2471 57.5099 87.7416 58.2499C88.2361 58.99 88.5 59.86 88.5 60.75C88.4986 61.9431 88.0241 63.0869 87.1805 63.9305C86.3369 64.7741 85.1931 65.2486 84 65.25V65.25Z"
                      fill="white"
                    />
                    <path
                      d="M38.6058 92.83H34.3498L33.5658 95H32.2218L35.7498 85.298H37.2198L40.7338 95H39.3898L38.6058 92.83ZM38.2418 91.794L36.4778 86.866L34.7138 91.794H38.2418ZM41.7954 91.15C41.7954 90.3567 41.954 89.666 42.2714 89.078C42.5887 88.4807 43.0274 88.0187 43.5874 87.692C44.1567 87.3653 44.8054 87.202 45.5334 87.202C46.476 87.202 47.2507 87.4307 47.8574 87.888C48.4734 88.3453 48.8794 88.98 49.0754 89.792H47.7034C47.5727 89.3253 47.316 88.9567 46.9334 88.686C46.56 88.4153 46.0934 88.28 45.5334 88.28C44.8054 88.28 44.2174 88.532 43.7694 89.036C43.3214 89.5307 43.0974 90.2353 43.0974 91.15C43.0974 92.074 43.3214 92.788 43.7694 93.292C44.2174 93.796 44.8054 94.048 45.5334 94.048C46.0934 94.048 46.56 93.9173 46.9334 93.656C47.3067 93.3947 47.5634 93.0213 47.7034 92.536H49.0754C48.87 93.32 48.4594 93.95 47.8434 94.426C47.2274 94.8927 46.4574 95.126 45.5334 95.126C44.8054 95.126 44.1567 94.9627 43.5874 94.636C43.0274 94.3093 42.5887 93.8473 42.2714 93.25C41.954 92.6527 41.7954 91.9527 41.7954 91.15ZM52.3293 88.378V92.9C52.3293 93.2733 52.4086 93.5393 52.5673 93.698C52.7259 93.8473 53.0013 93.922 53.3933 93.922H54.3313V95H53.1833C52.4739 95 51.9419 94.8367 51.5873 94.51C51.2326 94.1833 51.0553 93.6467 51.0553 92.9V88.378H50.0613V87.328H51.0553V85.396H52.3293V87.328H54.3313V88.378H52.3293ZM62.6789 87.328V95H61.4049V93.866C61.1622 94.258 60.8215 94.566 60.3829 94.79C59.9535 95.0047 59.4775 95.112 58.9549 95.112C58.3575 95.112 57.8209 94.9907 57.3449 94.748C56.8689 94.496 56.4909 94.1227 56.2109 93.628C55.9402 93.1333 55.8049 92.5313 55.8049 91.822V87.328H57.0649V91.654C57.0649 92.41 57.2562 92.9933 57.6389 93.404C58.0215 93.8053 58.5442 94.006 59.2069 94.006C59.8882 94.006 60.4249 93.796 60.8169 93.376C61.2089 92.956 61.4049 92.3447 61.4049 91.542V87.328H62.6789ZM64.354 91.136C64.354 90.352 64.5126 89.666 64.83 89.078C65.1473 88.4807 65.5813 88.0187 66.132 87.692C66.692 87.3653 67.3126 87.202 67.994 87.202C68.666 87.202 69.2493 87.3467 69.744 87.636C70.2386 87.9253 70.6073 88.2893 70.85 88.728V87.328H72.138V95H70.85V93.572C70.598 94.02 70.22 94.3933 69.716 94.692C69.2213 94.9813 68.6426 95.126 67.98 95.126C67.2986 95.126 66.6826 94.958 66.132 94.622C65.5813 94.286 65.1473 93.8147 64.83 93.208C64.5126 92.6013 64.354 91.9107 64.354 91.136ZM70.85 91.15C70.85 90.5713 70.7333 90.0673 70.5 89.638C70.2666 89.2087 69.9493 88.882 69.548 88.658C69.156 88.4247 68.722 88.308 68.246 88.308C67.77 88.308 67.336 88.42 66.944 88.644C66.552 88.868 66.2393 89.1947 66.006 89.624C65.7726 90.0533 65.656 90.5573 65.656 91.136C65.656 91.724 65.7726 92.2373 66.006 92.676C66.2393 93.1053 66.552 93.4367 66.944 93.67C67.336 93.894 67.77 94.006 68.246 94.006C68.722 94.006 69.156 93.894 69.548 93.67C69.9493 93.4367 70.2666 93.1053 70.5 92.676C70.7333 92.2373 70.85 91.7287 70.85 91.15ZM75.5649 84.64V95H74.2909V84.64H75.5649ZM78.3942 86.082C78.1515 86.082 77.9462 85.998 77.7782 85.83C77.6102 85.662 77.5262 85.4567 77.5262 85.214C77.5262 84.9713 77.6102 84.766 77.7782 84.598C77.9462 84.43 78.1515 84.346 78.3942 84.346C78.6275 84.346 78.8235 84.43 78.9822 84.598C79.1502 84.766 79.2342 84.9713 79.2342 85.214C79.2342 85.4567 79.1502 85.662 78.9822 85.83C78.8235 85.998 78.6275 86.082 78.3942 86.082ZM79.0102 87.328V95H77.7362V87.328H79.0102ZM82.1335 93.95H85.8995V95H80.6775V93.95L84.4015 88.364H80.7055V87.328H85.8715V88.364L82.1335 93.95ZM87.0766 91.136C87.0766 90.352 87.2353 89.666 87.5526 89.078C87.8699 88.4807 88.3039 88.0187 88.8546 87.692C89.4146 87.3653 90.0353 87.202 90.7166 87.202C91.3886 87.202 91.9719 87.3467 92.4666 87.636C92.9613 87.9253 93.3299 88.2893 93.5726 88.728V87.328H94.8606V95H93.5726V93.572C93.3206 94.02 92.9426 94.3933 92.4386 94.692C91.9439 94.9813 91.3653 95.126 90.7026 95.126C90.0213 95.126 89.4053 94.958 88.8546 94.622C88.3039 94.286 87.8699 93.8147 87.5526 93.208C87.2353 92.6013 87.0766 91.9107 87.0766 91.136ZM93.5726 91.15C93.5726 90.5713 93.4559 90.0673 93.2226 89.638C92.9893 89.2087 92.6719 88.882 92.2706 88.658C91.8786 88.4247 91.4446 88.308 90.9686 88.308C90.4926 88.308 90.0586 88.42 89.6666 88.644C89.2746 88.868 88.9619 89.1947 88.7286 89.624C88.4953 90.0533 88.3786 90.5573 88.3786 91.136C88.3786 91.724 88.4953 92.2373 88.7286 92.676C88.9619 93.1053 89.2746 93.4367 89.6666 93.67C90.0586 93.894 90.4926 94.006 90.9686 94.006C91.4446 94.006 91.8786 93.894 92.2706 93.67C92.6719 93.4367 92.9893 93.1053 93.2226 92.676C93.4559 92.2373 93.5726 91.7287 93.5726 91.15ZM98.2875 88.574C98.5115 88.1353 98.8289 87.7947 99.2395 87.552C99.6595 87.3093 100.168 87.188 100.766 87.188V88.504H100.43C99.0015 88.504 98.2875 89.2787 98.2875 90.828V95H97.0135V87.328H98.2875V88.574ZM109.091 88.378H107.481V95H106.207V88.378H105.213V87.328H106.207V86.782C106.207 85.9233 106.426 85.298 106.865 84.906C107.313 84.5047 108.027 84.304 109.007 84.304V85.368C108.447 85.368 108.05 85.48 107.817 85.704C107.593 85.9187 107.481 86.278 107.481 86.782V87.328H109.091V88.378ZM113.922 95.126C113.203 95.126 112.55 94.9627 111.962 94.636C111.383 94.3093 110.926 93.8473 110.59 93.25C110.263 92.6433 110.1 91.9433 110.1 91.15C110.1 90.366 110.268 89.6753 110.604 89.078C110.949 88.4713 111.416 88.0093 112.004 87.692C112.592 87.3653 113.25 87.202 113.978 87.202C114.706 87.202 115.364 87.3653 115.952 87.692C116.54 88.0093 117.002 88.4667 117.338 89.064C117.683 89.6613 117.856 90.3567 117.856 91.15C117.856 91.9433 117.679 92.6433 117.324 93.25C116.979 93.8473 116.507 94.3093 115.91 94.636C115.313 94.9627 114.65 95.126 113.922 95.126ZM113.922 94.006C114.379 94.006 114.809 93.8987 115.21 93.684C115.611 93.4693 115.933 93.1473 116.176 92.718C116.428 92.2887 116.554 91.766 116.554 91.15C116.554 90.534 116.433 90.0113 116.19 89.582C115.947 89.1527 115.63 88.8353 115.238 88.63C114.846 88.4153 114.421 88.308 113.964 88.308C113.497 88.308 113.068 88.4153 112.676 88.63C112.293 88.8353 111.985 89.1527 111.752 89.582C111.519 90.0113 111.402 90.534 111.402 91.15C111.402 91.7753 111.514 92.3027 111.738 92.732C111.971 93.1613 112.279 93.4833 112.662 93.698C113.045 93.9033 113.465 94.006 113.922 94.006ZM121.085 88.378V92.9C121.085 93.2733 121.164 93.5393 121.323 93.698C121.482 93.8473 121.757 93.922 122.149 93.922H123.087V95H121.939C121.23 95 120.698 94.8367 120.343 94.51C119.988 94.1833 119.811 93.6467 119.811 92.9V88.378H118.817V87.328H119.811V85.396H121.085V87.328H123.087V88.378H121.085ZM127.977 95.126C127.258 95.126 126.605 94.9627 126.017 94.636C125.438 94.3093 124.981 93.8473 124.645 93.25C124.318 92.6433 124.155 91.9433 124.155 91.15C124.155 90.366 124.323 89.6753 124.659 89.078C125.004 88.4713 125.471 88.0093 126.059 87.692C126.647 87.3653 127.305 87.202 128.033 87.202C128.761 87.202 129.419 87.3653 130.007 87.692C130.595 88.0093 131.057 88.4667 131.393 89.064C131.738 89.6613 131.911 90.3567 131.911 91.15C131.911 91.9433 131.733 92.6433 131.379 93.25C131.033 93.8473 130.562 94.3093 129.965 94.636C129.367 94.9627 128.705 95.126 127.977 95.126ZM127.977 94.006C128.434 94.006 128.863 93.8987 129.265 93.684C129.666 93.4693 129.988 93.1473 130.231 92.718C130.483 92.2887 130.609 91.766 130.609 91.15C130.609 90.534 130.487 90.0113 130.245 89.582C130.002 89.1527 129.685 88.8353 129.293 88.63C128.901 88.4153 128.476 88.308 128.019 88.308C127.552 88.308 127.123 88.4153 126.731 88.63C126.348 88.8353 126.04 89.1527 125.807 89.582C125.573 90.0113 125.457 90.534 125.457 91.15C125.457 91.7753 125.569 92.3027 125.793 92.732C126.026 93.1613 126.334 93.4833 126.717 93.698C127.099 93.9033 127.519 94.006 127.977 94.006ZM56.2329 111.136C56.2329 110.352 56.3915 109.666 56.7089 109.078C57.0262 108.481 57.4602 108.019 58.0109 107.692C58.5709 107.365 59.1962 107.202 59.8869 107.202C60.4842 107.202 61.0395 107.342 61.5529 107.622C62.0662 107.893 62.4582 108.252 62.7289 108.7V104.64H64.0169V115H62.7289V113.558C62.4769 114.015 62.1035 114.393 61.6089 114.692C61.1142 114.981 60.5355 115.126 59.8729 115.126C59.1915 115.126 58.5709 114.958 58.0109 114.622C57.4602 114.286 57.0262 113.815 56.7089 113.208C56.3915 112.601 56.2329 111.911 56.2329 111.136ZM62.7289 111.15C62.7289 110.571 62.6122 110.067 62.3789 109.638C62.1455 109.209 61.8282 108.882 61.4269 108.658C61.0349 108.425 60.6009 108.308 60.1249 108.308C59.6489 108.308 59.2149 108.42 58.8229 108.644C58.4309 108.868 58.1182 109.195 57.8849 109.624C57.6515 110.053 57.5349 110.557 57.5349 111.136C57.5349 111.724 57.6515 112.237 57.8849 112.676C58.1182 113.105 58.4309 113.437 58.8229 113.67C59.2149 113.894 59.6489 114.006 60.1249 114.006C60.6009 114.006 61.0349 113.894 61.4269 113.67C61.8282 113.437 62.1455 113.105 62.3789 112.676C62.6122 112.237 62.7289 111.729 62.7289 111.15ZM73.1698 110.87C73.1698 111.113 73.1558 111.369 73.1278 111.64H66.9958C67.0425 112.396 67.2991 112.989 67.7658 113.418C68.2418 113.838 68.8158 114.048 69.4878 114.048C70.0385 114.048 70.4958 113.922 70.8598 113.67C71.2331 113.409 71.4945 113.063 71.6438 112.634H73.0158C72.8105 113.371 72.3998 113.973 71.7838 114.44C71.1678 114.897 70.4025 115.126 69.4878 115.126C68.7598 115.126 68.1065 114.963 67.5278 114.636C66.9585 114.309 66.5105 113.847 66.1838 113.25C65.8571 112.643 65.6938 111.943 65.6938 111.15C65.6938 110.357 65.8525 109.661 66.1698 109.064C66.4871 108.467 66.9305 108.009 67.4998 107.692C68.0785 107.365 68.7411 107.202 69.4878 107.202C70.2158 107.202 70.8598 107.361 71.4198 107.678C71.9798 107.995 72.4091 108.434 72.7078 108.994C73.0158 109.545 73.1698 110.17 73.1698 110.87ZM71.8538 110.604C71.8538 110.119 71.7465 109.703 71.5318 109.358C71.3171 109.003 71.0231 108.737 70.6498 108.56C70.2858 108.373 69.8798 108.28 69.4318 108.28C68.7878 108.28 68.2371 108.485 67.7798 108.896C67.3318 109.307 67.0751 109.876 67.0098 110.604H71.8538ZM79.8579 108.742C80.1099 108.303 80.4832 107.939 80.9779 107.65C81.4819 107.351 82.0652 107.202 82.7279 107.202C83.4092 107.202 84.0252 107.365 84.5759 107.692C85.1359 108.019 85.5745 108.481 85.8919 109.078C86.2092 109.666 86.3679 110.352 86.3679 111.136C86.3679 111.911 86.2092 112.601 85.8919 113.208C85.5745 113.815 85.1359 114.286 84.5759 114.622C84.0252 114.958 83.4092 115.126 82.7279 115.126C82.0745 115.126 81.4959 114.981 80.9919 114.692C80.4972 114.393 80.1192 114.025 79.8579 113.586V118.64H78.5839V107.328H79.8579V108.742ZM85.0659 111.136C85.0659 110.557 84.9492 110.053 84.7159 109.624C84.4825 109.195 84.1652 108.868 83.7639 108.644C83.3719 108.42 82.9379 108.308 82.4619 108.308C81.9952 108.308 81.5612 108.425 81.1599 108.658C80.7679 108.882 80.4505 109.213 80.2079 109.652C79.9745 110.081 79.8579 110.581 79.8579 111.15C79.8579 111.729 79.9745 112.237 80.2079 112.676C80.4505 113.105 80.7679 113.437 81.1599 113.67C81.5612 113.894 81.9952 114.006 82.4619 114.006C82.9379 114.006 83.3719 113.894 83.7639 113.67C84.1652 113.437 84.4825 113.105 84.7159 112.676C84.9492 112.237 85.0659 111.724 85.0659 111.136ZM95.0448 110.87C95.0448 111.113 95.0308 111.369 95.0028 111.64H88.8708C88.9175 112.396 89.1741 112.989 89.6408 113.418C90.1168 113.838 90.6908 114.048 91.3628 114.048C91.9135 114.048 92.3708 113.922 92.7348 113.67C93.1081 113.409 93.3695 113.063 93.5188 112.634H94.8908C94.6855 113.371 94.2748 113.973 93.6588 114.44C93.0428 114.897 92.2775 115.126 91.3628 115.126C90.6348 115.126 89.9815 114.963 89.4028 114.636C88.8335 114.309 88.3855 113.847 88.0588 113.25C87.7321 112.643 87.5688 111.943 87.5688 111.15C87.5688 110.357 87.7275 109.661 88.0448 109.064C88.3621 108.467 88.8055 108.009 89.3748 107.692C89.9535 107.365 90.6161 107.202 91.3628 107.202C92.0908 107.202 92.7348 107.361 93.2948 107.678C93.8548 107.995 94.2841 108.434 94.5828 108.994C94.8908 109.545 95.0448 110.17 95.0448 110.87ZM93.7288 110.604C93.7288 110.119 93.6215 109.703 93.4068 109.358C93.1921 109.003 92.8981 108.737 92.5248 108.56C92.1608 108.373 91.7548 108.28 91.3068 108.28C90.6628 108.28 90.1121 108.485 89.6548 108.896C89.2068 109.307 88.9501 109.876 88.8848 110.604H93.7288ZM98.0004 108.574C98.2244 108.135 98.5418 107.795 98.9524 107.552C99.3724 107.309 99.8811 107.188 100.478 107.188V108.504H100.142C98.7144 108.504 98.0004 109.279 98.0004 110.828V115H96.7264V107.328H98.0004V108.574ZM105.071 108.378H103.461V115H102.187V108.378H101.193V107.328H102.187V106.782C102.187 105.923 102.406 105.298 102.845 104.906C103.293 104.505 104.007 104.304 104.987 104.304V105.368C104.427 105.368 104.03 105.48 103.797 105.704C103.573 105.919 103.461 106.278 103.461 106.782V107.328H105.071V108.378ZM107.215 106.082C106.972 106.082 106.767 105.998 106.599 105.83C106.431 105.662 106.347 105.457 106.347 105.214C106.347 104.971 106.431 104.766 106.599 104.598C106.767 104.43 106.972 104.346 107.215 104.346C107.448 104.346 107.644 104.43 107.803 104.598C107.971 104.766 108.055 104.971 108.055 105.214C108.055 105.457 107.971 105.662 107.803 105.83C107.644 105.998 107.448 106.082 107.215 106.082ZM107.831 107.328V115H106.557V107.328H107.831ZM111.276 104.64V115H110.002V104.64H111.276Z"
                      fill="white"
                    />
                  </svg>
                </div> */}
                <div className="sm:flex sm:justify-between sm:gap-[16px] lg:justify-start lg:gap-[56px] w-full items-center">
                  <div className="pb-4 sm:w-1/2">
                    <label
                      forlabel="name"
                      className="block mb-2 text-lg font-medium"
                    >
                      Nombre(s):
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12"
                            cy="6"
                            r="4"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M20.4141 18.5H18.9999M18.9999 18.5H17.5857M18.9999 18.5L18.9999 17.0858M18.9999 18.5L18.9999 19.9142"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12 13C14.6083 13 16.8834 13.8152 18.0877 15.024M15.5841 20.4366C14.5358 20.7944 13.3099 21 12 21C8.13401 21 5 19.2091 5 17C5 15.6407 6.18652 14.4398 8 13.717"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className=" rounded-lg w-full pl-10 p-3 border-[1px] border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                        placeholder="Ingresa tu Nombre"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "El campo Nombre es requerido",
                          },
                        })}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="pb-4 sm:w-1/2">
                    <label
                      forlabel="lastname"
                      className="block mb-2 text-lg font-medium"
                    >
                      Apellido(s):
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                      <input
                        type="text"
                        className=" rounded-lg w-full p-3 border-[1px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                        placeholder="Ingresa tu Apellido"
                        {...register("lastname", {
                          required: {
                            value: true,
                            message: "El campo Apellido es requerido",
                          },
                        })}
                      />
                    </div>
                    {errors.lastname && (
                      <span className="text-red-500">
                        {errors.lastname.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="sm:flex sm:justify-center sm:gap-4 lg:flex lg:justify-start lg:gap-14 ">
                  <div className="pb-4 w-full">
                    <label
                      forlabel="phone"
                      className="block mb-2 text-lg font-medium"
                    >
                      Celular:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="-1 0 19 19"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M16.5 9.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-4.778-4.845a.803.803 0 0 0-.8-.8H6.077a.803.803 0 0 0-.8.8v9.692a.802.802 0 0 0 .8.8h4.845a.802.802 0 0 0 .8-.8zM6.077 5.912h4.845v7.266H6.077zm1.103-.99a.4.4 0 0 1 .4-.4h1.84a.4.4 0 0 1 0 .8H7.58a.4.4 0 0 1-.4-.4zm1.715 9.24a.394.394 0 1 1-.394-.394.394.394 0 0 1 .394.394z" />
                        </svg>
                        <p className="pl-[4px]">+52</p>
                      </div>
                      <input
                        type="number"
                        name="phone"
                        className="rounded-lg w-full pl-[68px] p-3 border-[1px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                        placeholder="xxxxxxxxxx"
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "El campo Celular es requerido",
                          },
                          minLength: {
                            value: 10,
                            message: "Mínimo 10 caracteres",
                          },
                          maxLength: {
                            value: 10,
                            message: "Máximo 10 caracteres",
                          },
                          pattern: {
                            value: /^[0-9]{1,10}$/,
                            message: "Número inválido",
                          },
                        })}
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-red-500">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                  <div className="pb-4 w-full">
                    <label
                      forlabel="birthday"
                      className="block mb-2 text-lg font-medium"
                    >
                      Fecha de Nacimiento:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                          />
                        </svg>
                      </div>
                      <input
                        type="date"
                        name="birthday"
                        className=" rounded-lg w-full pl-10 p-3 border-[1px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                        placeholder="Ingresa tu Nombre"
                        {...register("birthday", {
                          required: {
                            value: true,
                            message: "El campo Fecha es requerido",
                          },
                          validate: (value) => {
                            const birthDate = new Date(value);
                            const currentDate = new Date();
                            const age =
                              currentDate.getFullYear() -
                              birthDate.getFullYear();
                            return age >= 18 || "Debes de ser mayor de edad";
                          },
                        })}
                      />
                    </div>
                    {errors.birthday && (
                      <span className="text-red-500">
                        {errors.birthday.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full sm:w-full">
                    <label
                      forlabel="sex"
                      className="block mb-2 text-lg font-medium"
                    >
                      Sexo:
                    </label>
                    <select
                      id="sex"
                      className="rounded-lg w-full p-3 border-[1px] border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                      {...register("sex", {
                        required: {
                          value: true,
                          message: "Selecciona un campo",
                        },
                      })}
                    >
                      <option value="">Seleccionar</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Otro">Otro</option>
                    </select>
                    {errors.sex && (
                      <span className="text-red-500">{errors.sex.message}</span>
                    )}
                  </div>
                  {/* <div className="flex justify-around item-center sm:gap-4 gap-4 bg-red-500"></div> */}
                </div>
                <div className="pt-4">
                  <label
                    htmlFor="aboutMe"
                    className="block mb-2 text-lg font-medium"
                  >
                    Acerca de mí{" "}
                  </label>
                  <textarea
                    id="aboutMe"
                    rows="6"
                    className=" rounded-lg w-full p-3 border-[1px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                    placeholder={`- ¿De dónde eres?\n- ¿Qué te gusta hacer?\n- ¿A qué te dedicas?\n- ¿Qué significan tus mascotas para ti?\n300 a 400 caracteres`}
                    {...register("aboutMe", {
                      required: {
                        value: true,
                        message: "El campo es requerido",
                      },
                      minLength: {
                        value: 300,
                        message: "Mínimo 300 caracteres",
                      },
                      maxLength: {
                        value: 400,
                        message: "Máximo 500 caracteres",
                      },
                    })}
                  ></textarea>
                </div>
                {errors.aboutMe && (
                  <span className="text-red-500">{errors.aboutMe.message}</span>
                )}
                <div>
                  <div className="border-b-[2px] border-[#FF6868] pt-4">
                    <h2 className="text-[24px] pb-[4px] font-[Nunito] font-semibold text-[#2B2E4A]">
                      Contacto de Emergencia
                    </h2>
                  </div>
                </div>
                <div className="lg:flex lg:items-center pt-4 gap-[36px]">
                  <p className="text-lg lg:w-64 text-justify font-light">
                    La información de este contacto servirá únicamente para
                    cuando tu anfitrión/cliente intente localizarte por algún
                    asunto relacionado a las mascotas y no sea posible lograrlo.
                  </p>
                  <div>
                    <div className="sm:flex sm:justify-center sm:gap-10  mt-5 lg:flex lg:justify-start lg:gap-14">
                      <div className="pb-4  sm:w-full">
                        <label
                          forlabel="emergencyContactName"
                          className="block mb-2 text-lg font-medium"
                        >
                          Nombre:
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="12"
                                cy="6"
                                r="4"
                                stroke="#1C274C"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M20.4141 18.5H18.9999M18.9999 18.5H17.5857M18.9999 18.5L18.9999 17.0858M18.9999 18.5L18.9999 19.9142"
                                stroke="#1C274C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M12 13C14.6083 13 16.8834 13.8152 18.0877 15.024M15.5841 20.4366C14.5358 20.7944 13.3099 21 12 21C8.13401 21 5 19.2091 5 17C5 15.6407 6.18652 14.4398 8 13.717"
                                stroke="#1C274C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="emergencyContactName"
                            className=" rounded-lg w-full pl-10 p-3 border-[1px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                            placeholder="Ingresa tu Nombre"
                            {...register("emergencyContactName", {
                              required: {
                                value: true,
                                message: "El campo Nombre es requerido",
                              },
                            })}
                          />
                        </div>
                        {errors.emergencyContactName && (
                          <span className="text-red-500">
                            {errors.emergencyContactName.message}
                          </span>
                        )}
                      </div>
                      <div className="pb-4  sm:w-full">
                        <label
                          forlabel="emergencyContactLastname"
                          className="block mb-2 text-lg font-medium"
                        >
                          Apellido(s):
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"></div>
                          <input
                            type="text"
                            name="lastName"
                            className=" rounded-lg w-full p-3 border-[1px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                            placeholder="Ingresa tu Apellido"
                            {...register("emergencyContactLastname", {
                              required: {
                                value: true,
                                message: "El campo Apellido es requerido",
                              },
                            })}
                          />
                        </div>
                        {errors.emergencyContactLastname && (
                          <span className="text-red-500">
                            {errors.emergencyContactLastname.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:flex sm:justify-center sm:gap-10 lg:flex lg:justify-start lg:gap-14 ">
                      <div className="pb-4 sm:w-full">
                        <label
                          forlabel="emergencyContactPhone"
                          className="block mb-2 text-lg font-medium"
                        >
                          Celular:
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="-1 0 19 19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M16.5 9.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-4.778-4.845a.803.803 0 0 0-.8-.8H6.077a.803.803 0 0 0-.8.8v9.692a.802.802 0 0 0 .8.8h4.845a.802.802 0 0 0 .8-.8zM6.077 5.912h4.845v7.266H6.077zm1.103-.99a.4.4 0 0 1 .4-.4h1.84a.4.4 0 0 1 0 .8H7.58a.4.4 0 0 1-.4-.4zm1.715 9.24a.394.394 0 1 1-.394-.394.394.394 0 0 1 .394.394z" />
                            </svg>
                            <p className="pl-[4px]">+52</p>
                          </div>
                          <input
                            type="number"
                            name="emergencyContactPhone"
                            className="rounded-lg w-full pl-[68px] p-3 border-[1px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                            placeholder="xxxxxxxxxx"
                            {...register("emergencyContactPhone", {
                              required: {
                                value: true,
                                message: "El campo Celular es requerido",
                              },
                              minLength: {
                                value: 10,
                                message: "Mínimo 10 caracteres",
                              },
                              maxLength: {
                                value: 10,
                                message: "Máximo 10 caracteres",
                              },
                              pattern: {
                                value: /^[0-9]{1,10}$/,
                                message: "Número inválido",
                              },
                            })}
                          />
                        </div>
                        {errors.emergencyContactPhone && (
                          <span className="text-red-500">
                            {errors.emergencyContactPhone.message}
                          </span>
                        )}
                      </div>
                      <div className=" w-full">
                        <label
                          forlabel="emergencyContactRelationship"
                          className="block mb-2 text-lg font-medium"
                        >
                          Parentesco:
                        </label>
                        <select
                          id="emergencyContactRelationship"
                          className="rounded-lg w-full p-3 border-[1px]  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#FF6868] focus:ring-[#FF6868] bg-[#F2F2F2]"
                          {...register("emergencyContactRelationship", {
                            required: {
                              value: true,
                              message: "Selecciona un campo",
                            },
                          })}
                        >
                          <option value="">Seleccionar</option>
                          <option value="Primo/a">Primo/a</option>
                          <option value="Hermano/a">Hermano/a</option>
                          <option value="Tío/a">Tío/a</option>
                          <option value="Mamá">Mamá</option>
                          <option value="Papá">Papá</option>
                          <option value="Amigo/a">Amigo/a</option>
                          <option value="Otro">Otro</option>
                        </select>
                        {errors.emergencyContactRelationship && (
                          <span className="text-red-500">
                            {errors.emergencyContactRelationship.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 flex justify-between items-center gap-[32px]">
                  <Link
                    href="/"
                    type="button"
                    className="px-6 py-3 text-center w-1/2 border-[1px] border-[#2B2E4A] rounded-full md:font-semibold  sm:mt-0 lg:mb-0 md:mb-0 sm:mb-0 hover:scale-[102%] transition active:bg-[#2B2E4A] active:text-white shadow-lg"
                  >
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    className="px-6 py-3.5 w-1/2 text-base md:font-bold text-white bg-[#FF6868] border-[1px] border-[#FF6868] hover:scale-[102%] active:bg-white active:text-[#FF6868] rounded-full text-center transition shadow-lg"
                  >
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
