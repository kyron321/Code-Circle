import { useRouter } from 'next/router';

export default function SinglePost() {
  var router = useRouter();
  var pid = router.query["pid"];
  console.log(pid);
  
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Single Post</h1>
    </div>
    
  )
}