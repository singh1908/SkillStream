import React, { useState, useEffect } from 'react';

const CurrentDate = () => {
    const [date, setDate] = useState(new Date());
  
    useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date());
      }, 60000); // Update every minute
      return () => clearInterval(timer);
    }, []);
  
    return <div>{date.toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', '')}</div>;
  };
   
  

export default CurrentDate;