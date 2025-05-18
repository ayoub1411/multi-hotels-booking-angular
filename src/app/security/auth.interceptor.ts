import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

console.log("interceptooooor")

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifSx7ImF1dGhvcml0eSI6IkNMSUVOVCJ9XSwic3ViIjoiYXlvdWJoYXNzMjAwMkBnbWFpbC5jb20iLCJpYXQiOjE3NDc1OTU5MjcsImV4cCI6MTc0NzYyNTkyN30.crn8Lo0iJWVVfFX4CvZXahOe40-wM5mrWrk0Z1ppWYk`
    }
  });
  return next(authReq);


};
