"use server";

import { createSupabaseServerClient } from "@/lib/server"; //from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function handleSignUp(formData) {
  const supabase = await createSupabaseServerClient();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const name = formData.get("name");
  const phoneNumber = formData.get("phoneNumber");
  const location = formData.get("location");
  const birthday = formData.get("birthday");

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, phone_number: phoneNumber, location, birthday },
    },
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  if (data.user) {
    const { error: insertError } = await supabase.from("teacher").insert({
      id: data.user.id, // UUID matches auth.users(id)
      email,
      name,
      phone_number: phoneNumber,
      location,
      birthday,
      created_at: new Date().toISOString(),
      is_active: true,
    });

    if (insertError) {
      console.error("Error creating teacher record:", insertError);
      return {
        error: `Failed to create teacher record: ${insertError.message}`,
      };
    }
  }

  return redirect("/auth?mode=signIn");
}

export async function handleSignIn(formData) {
  "use server";
  const supabase = await createSupabaseServerClient();
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return redirect("/dashboard");
}

export async function handleUpdateProfile(formData) {
  "use server";
  const supabase = await createSupabaseServerClient();
  const name = formData.get("name");
  const phoneNumber = formData.get("phoneNumber");
  const location = formData.get("location");
  const birthday = formData.get("birthday");

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Not authenticated" };
  }

  const { error: metadataError } = await supabase.auth.updateUser({
    data: { name, phone_number: phoneNumber, location, birthday },
  });

  if (metadataError) {
    return { error: metadataError.message };
  }

  const { error: teacherError } = await supabase
    .from("teacher")
    .update({
      name,
      phone_number: phoneNumber,
      location,
      birthday,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (teacherError) {
    return { error: teacherError.message };
  }

  return redirect("/dashboard");
}

export async function handleSignOut() {
  "use server";
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  return redirect("/");
}
