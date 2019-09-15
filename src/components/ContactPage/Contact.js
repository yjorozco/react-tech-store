import React from 'react';
import Title from '../Title';
export default function Contact() {
    return (
        <section className="py-5">
           <div className="row">
               <div className="col-10 mx-auto col-md-6 my-3">
                   <Title title="contact us" /> 
                   <form className="mt-5" action="https://formspree.io/yamiloro@gmail.com" method="POST">
                        <div className="form-group">
                           <input type="text" 
                           name="firstName" 
                           className="form-control" 
                           placeholder="jhon smith"/>
                        </div>
                        <div className="form-group">
                           <input type="text" 
                           name="email" 
                           className="form-control" 
                           placeholder="email@gmail.com"/>
                        </div>
                        <div className="form-group">
                           <input type="text" 
                           name="subject" 
                           className="form-control" 
                           placeholder="importan!!!"/>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control"  name="message"  rows="10" placeholder="hello there buddy"></textarea>
                        </div>
                        <div className="form-group mt-3">
                            <input type="submit" 
                            value="Send" 
                            className="form-control bg-primary text-white" />
                        </div>
                   </form>
               </div>
           </div>
        </section>
    )
}
