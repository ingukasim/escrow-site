"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";

export default function FeedbackPage(){

const router=useRouter();

const [rating,setRating]=useState(5);

const [comment,setComment]=useState("");

const submitFeedback=async()=>{

const {
data:{user}
}=await supabase.auth.getUser();

await supabase
.from("feedback")
.insert({

user_email:user?.email,

rating,

comment

});

alert(
"Feedback submitted successfully ⭐"
);

router.push("/");

};

return(

<div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

<div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md">

<h1 className="text-3xl font-bold mb-6">

Leave Feedback ⭐

</h1>

<div className="mb-4">

<label>
Rating
</label>

<select
value={rating}
onChange={(e)=>
setRating(
Number(e.target.value)
)
}
className="w-full p-4 rounded-xl bg-black"
>

<option value={5}>⭐⭐⭐⭐⭐</option>
<option value={4}>⭐⭐⭐⭐</option>
<option value={3}>⭐⭐⭐</option>
<option value={2}>⭐⭐</option>
<option value={1}>⭐</option>

</select>

</div>

<textarea

placeholder="Write your feedback..."

value={comment}

onChange={(e)=>
setComment(
e.target.value
)
}

className="w-full p-4 rounded-xl bg-black h-32"

/>

<button

onClick={submitFeedback}

className="mt-6 bg-green-500 w-full py-4 rounded-xl text-black font-bold"

>

Submit Feedback

</button>

</div>

</div>

);

}