'use client'

import React, { useState, useEffect } from 'react'
import { wordpressGraphQlApiUrl, frontendUrl, siteEmail, siteFromEmail  } from "../utils/variables";



export default function ContactForm() {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false)



  //MAIL API
  async function sendMail() {

    const fromMail = siteFromEmail
    const toMail =  siteEmail
    const mutationId = '1265'
    const bodyMail = `<html><head></head><body><div style='border:solid thin #07bdcb;padding:30px;color:#07bdcb;'><strong><p>Name: ` + name + `<p/><p>Email: ` + email + `<p/><p>Phone: ` + phone + `<p/>Message: ` + message + `</p></strong></div></body></html>`

    const { data } = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query:
          `mutation SEND_EMAIL {
              sendEmail(
                input: {
                  to: "`+ toMail + `", 
                  from: "`+ fromMail + `", 
                  subject: "Contact us form from `+ frontendUrl + `", 
                  body: "`+ bodyMail + `", 
                  clientMutationId: "`+ mutationId + `"
                }
              ) {
                origin
                sent
                message
              }
            }
      `
      }),
      next: { revalidate: 10 }
    }).then(res => res.json())

    let headerPost = data

    setSuccessAlert(true)

    //console.log(headerPost)

    ////console.log('Test')

  }



  useEffect(() => {
  }, [name, email, phone, message]);

  // Validate form 
  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = 'Name is required.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    if (!phone) {
      errors.phone = 'Phone is required.';
    }


    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };


  //VALIDATE LIVE
  const changeValidate = () => {
    validateForm()
  }

  // Submit 
  const submitEmail = () => {
    validateForm()
    if (isFormValid) {
      sendMail()
      setTimeout(() => {
        setSuccessAlert(false)
      }, 4000);
    }
  };

  return (
    <>
      <input
        type="text"
        className={errors.name ? 'form-control mb-3 border-danger' : 'form-control mb-3'}
        placeholder='Full Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={changeValidate}
      />
      {errors.name && <p className='text-danger mb-3'>{errors.name}</p>}
      <input
        type="email"
        className={errors.email ? 'form-control mb-3 border-danger' : 'form-control mb-3'}
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={changeValidate}
      />
      {errors.email && <p className='text-danger mb-3'>{errors.email}</p>}
      <input
        type="number"
        className={errors.phone ? 'form-control mb-3 border-danger' : 'form-control mb-3'}
        placeholder='Mobile Number'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onBlur={changeValidate}
      />
      {errors.phone && <p className='text-danger mb-3'>{errors.phone}</p>}
      <textarea
        className='form-control mb-3'
        placeholder='What you have to say about us'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onBlur={changeValidate}
      ></textarea>
      <button aria-label="Submit Button" type="submit" className='btn btn-secondary btn-md px-4 py-3 rounded-1 text-uppercase w-100' onClick={submitEmail} >Submit</button>
      <div className={successAlert == false ? "d-none" : "alert alert-success mt-3"}>Your message has been sent successfully</div>
    </>
  )
}

