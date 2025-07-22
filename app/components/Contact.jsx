import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'

const Contact = ({isDarkMode}) => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "c3f8be15-0a70-4a91-a49c-9e43a62740cd");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

	return (
    <div
      id='contact'
      className= { isDarkMode ? 'w-full max-w-5xl mx-auto py-16 px-4 scroll-mt-30' : "w-full max-w-5xl mx-auto py-16 px-4 scroll-mt-30 bg-[url(/footer-bg-color.png)] bg-no-repeat bg-center bg-[length:90%_auto]" }
    >
      <h4 className='text-center mb-2 text-lg font-Ovo'>Connect With Me</h4>
      <h2 className='text-center text-5xl font-Ovo'>Get In Touch</h2>
      <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        If you have any questions, want to collaborate on a project, or just want to say hello, feel free to reach out! I'm always open to new opportunities and discussions.
      </p>
	  <form onSubmit={onSubmit} className='max-w-2xl mx-auto '>
		<div className='grid grid-cols-auto gap-6 mt-10 mb-8'>
			<input type='text' placeholder='Enter your name' required
			className={isDarkMode ? 'flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-black border-white/90' : 'flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white'}
			name='name'
			/>
			<input type='email' placeholder='Enter your email' required
			className= {isDarkMode ? 'flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md  bg-black border-white/90' : 'flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white'} 
			name='email'
			/>
		</div>
		<textarea rows='6' placeholder='Enter your message' required
		className= {isDarkMode ? 'w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md mb-6 bg-black border-white/90' : 'w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6'}  
		name='message'
		></textarea>

		<button type='submit'
		className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500'
		>Submit Now <Image src={assets.right_arrow_white} alt='' className='w-4'/></button>
		<p className='mt-4'>{result}</p>
	  </form>
    </div>
  )
}

export default Contact
