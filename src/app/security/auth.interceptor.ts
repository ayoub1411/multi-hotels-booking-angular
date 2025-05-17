import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

console.log("interceptooooor")

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifSx7ImF1dGhvcml0eSI6IkNMSUVOVCJ9XSwic3ViIjoiYXlvdWJoYXNzMjAwMkBnbWFpbC5jb20iLCJpYXQiOjE3NDYyNzY2MjMsImV4cCI6MTc0NjMwNjYyM30.CqGRIfRH_r-ytgFvLyfnNb6AiokQNeQCknorc4F85Cw`
    }
  });
  return next(authReq);


};
