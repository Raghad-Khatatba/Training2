import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Resume.css"
export default function Resume() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/search');
  };
  return (
<section className="resume my-3 py-5">
  <div className="container py-4">
    <div className="row justify-content-between">
      <div className="col-md-6">
        <div className="contest">
          <div className="text-center m-2 mt-4">
            <h5 classname="pt-2">COOKIE TIME</h5>
            <div classname="divider" />
            <p>It's cookie Time.Get The Cookie Monster out of you.and sendus the best cookie recipe you know.</p>
            <button class="btn border border-black rounded-pill text-black text-white" onClick={handleButtonClick}>Find Recipe</button>
          </div>
        </div>  
      </div>
    </div>
  </div>
</section>

  )
}
