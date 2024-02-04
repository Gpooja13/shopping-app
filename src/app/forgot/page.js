import Image from "next/image";

const forgot = () => {
  return (
    <section class="h-screen">
      <div class="container h-full px-6 py-10">
        <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="w-full"
              alt="Phone image"
            />
          </div>

          <div class="md:w-8/12 lg:ml-6 lg:w-5/12">
            <div className="md:flex lg:flex justify-center items-center hidden">
              <Image
                className=""
                src="/logo.webp"
                alt="logo"
                width={80}
                height={80}
              />
              <h2 className="font-bold text-3xl">Forgot your password</h2>
            </div>

            <form>
              <div class="relative mb-6" data-te-input-wrapper-init>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-400 focus:border-indigo-600 block w-full p-2.5  "
                  placeholder="name@company.com"
                  required=""
                />
              </div>

              <button
                type="submit"
                class="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] bg-indigo-500 "
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Send email
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default forgot;
