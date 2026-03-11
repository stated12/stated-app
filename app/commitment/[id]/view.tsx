"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CommitmentClient({
  commitmentId
}:{
  commitmentId:string
}){

const supabase = createClient();

const [result,setResult] = useState<any>(null);
const [error,setError] = useState<any>(null);

useEffect(()=>{
testQuery();
},[]);

async function testQuery(){

const {data,error} =
await supabase
.from("commitments")
.select("*")
.eq("id",commitmentId)
.maybeSingle();

setResult(data);
setError(error);

}

return(

<div style={{padding:40,fontFamily:"monospace"}}>

<h2>Commitment Debug</h2>

<div>
<b>ID:</b> {commitmentId}
</div>

<br/>

<div>
<b>Supabase result:</b>
</div>

<pre>
{JSON.stringify(result,null,2)}
</pre>

<br/>

<div>
<b>Error:</b>
</div>

<pre>
{JSON.stringify(error,null,2)}
</pre>

</div>

);

}
