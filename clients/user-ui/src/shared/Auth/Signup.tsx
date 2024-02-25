import styles from "@/src/utils/style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  phone_number: z
    .number()
    .min(10, "Phone number must be at least 10 characters."),
});

type SignupSchema = z.infer<typeof formSchema>;

function Signup({ setActiveState }: { setActiveState: (e: string) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(formSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: SignupSchema) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Sign up with Let&apos;s Chuumon</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`}>Enter your name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="John Doe"
            className={`${styles.input}`}
          />
          {errors.name && (
            <span className="text-red-500 block mt-1">{`${errors.name.message}`}</span>
          )}
        </div>

        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`}>Enter your email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="email@email.com"
            className={`${styles.input}`}
          />
          {errors.email && (
            <span className="text-red-500 block mt-1">{`${errors.email.message}`}</span>
          )}
        </div>

        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`}>Enter your phone number</label>
          <input
            {...register("phone_number")}
            type="number"
            placeholder="+60123456789"
            className={`${styles.input}`}
          />
          {errors.phone_number && (
            <span className="text-red-500 block mt-1">{`${errors.phone_number.message}`}</span>
          )}
        </div>

        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className={`${styles.input}`}
          />
          {errors.password && (
            <span className="text-red-500 block mt-1">{`${errors.password.message}`}</span>
          )}
          {!showPassword ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        <div className="w-full mt-5">
          <input
            type="submit"
            value="Sign Up"
            disabled={isSubmitting}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />

        <h5 className="text-center pt-4 font-Poppins text-[16px] text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>

        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already have an account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Login")}
          >
            Login now
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
}

export default Signup;
