import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

import { useAppSelector } from "@/app/hooks";
import { CreateWorkoutRequest } from "@/app/services/interfaces/workoutInterface";
import { useCreateWorkoutMutation } from "@/app/services/workoutApi";
import ErrorQueryHandling from "@/components/errorQuery";
import Spinner from "@/components/spinner";
import HeadPage from "@/components/headPage";

const WorkoutPage = () => {
  // Get user id
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const [createWorkout, { isLoading, isError, error }] =
    useCreateWorkoutMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkoutRequest>();

  const onCreateWorkoutSubmit: SubmitHandler<CreateWorkoutRequest> = async (
    data
  ) => {
    try {
      data.userId = user?.id as string;
      const workout = await createWorkout(data).unwrap();
      const { id } = workout;
      router.push(`/workout/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <>
      <HeadPage title="Create workout" />
      <h1 className="heading-brand">Create a new workout</h1>
      <p className="text-center">Enjoy your new workout!</p>
      <div className="container-brand">
        <div className="form-brand-container">
          <form
            className="form-brand"
            onSubmit={handleSubmit(onCreateWorkoutSubmit)}
          >
            {/* Workout Name */}
            <label htmlFor="name" className="label-brand">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "The name is required" })}
              className="input-brand"
            />
            {errors.name && (
              <span className="error-brand">{errors.name.message}</span>
            )}

            {/* Submit */}
            <button type="submit" className="button-brand">
              Create new workout
            </button>

            {/*Status */}
            {isLoading && <Spinner />}
            {isError ? <ErrorQueryHandling error={error} /> : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default WorkoutPage;
