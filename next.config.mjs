export default {
  async redirects() {
    return [
      {source:'/index.php',destination:'/',permanent:true},
      {source:'/index.html',destination:'/',permanent:true},
      {source:'/side-stand.php',destination:'/side-stands',permanent:true},
      {source:'/side-stand',destination:'/side-stands',permanent:true},
      {source:'/footrests.php',destination:'/footrest',permanent:true},
      {source:'/footrests',destination:'/footrest',permanent:true},
      {source:'/:page.php',destination:'/:page',permanent:true},
    ];
  },
};
