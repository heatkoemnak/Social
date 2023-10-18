import React from 'react';

export default function Uploading({ msg }) {
  return (
    <>
      <div className="Uploading">
        <i class="fa-solid fa-cloud-arrow-up fa-fade icon-upload"></i>

        <div>
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
          {msg && msg}
        </div>
      </div>
    </>
  );
}
