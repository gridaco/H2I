export const demo_src = {
  language: "html",
  img: "https://i.pinimg.com/736x/99/ee/df/99eedf1d953983073139ecabf665fdc0.jpg",
  value: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        margin: 0px;
        font-family: Helvetica, "Helvetica Neue", Roboto, Noto, Arial,
          sans-serif;
      }

      #root {
        min-height: 100vh;
        background-color: black;
        position: relative;
      }

      #background {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: absolute;
        left: 0px;
        top: 0px;
      }

      #Vector5 {
        width: 599px;
        height: 434px;
        position: absolute;
        left: -104px;
        top: 270px;
        filter: blur(524.24px);
      }

      #Vector6 {
        width: 405px;
        height: 405px;
        position: absolute;
        left: 815px;
        top: 194px;
        filter: blur(524.24px);
      }

      #Vector8 {
        width: 405px;
        height: 405px;
        position: absolute;
        left: 59px;
        top: 784px;
        filter: blur(524.24px);
        transform: rotate(-61deg);
        transform-origin: top left;
      }

      #Vector7 {
        width: 599px;
        height: 434px;
        position: absolute;
        left: 717px;
        top: -117px;
        filter: blur(524.24px);
      }

      #heading {
        color: white;
        text-overflow: ellipsis;
        font-size: 80px;
        font-family: Inter, sans-serif;
        font-weight: 900;
        text-align: left;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div id="background">
        <svg xmlns="http://www.w3.org/2000/svg" id="Vector5">
          <defs>
            <linearGradient id="linear-gradient">
              <stop offset="0%" style="stop-color: rgb(63, 50, 149)" />
              <stop offset="100%" style="stop-color: rgba(55, 40, 146, 0.87)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#linear-gradient)"
            d="M 213.72695425961876 162.6822111455513 C 181.6006802140713 87.67609889759191 165.90047200630275 -46.60904216126457 360.1098561525647 16.29931004670136 C 602.8715832587726 94.93475030665878 652.0692902503956 100.58040088654073 547.6252913791201 162.6822111455513 C 443.1812925078446 224.78402140456186 248.40734866681734 280.03045892053194 246.79431393521463 405.0406460004642 C 245.5038861307036 505.0487956644101 81.72709511895037 319.01212605835156 0 213.49277870056798 L 213.72695425961876 162.6822111455513 Z"
          ></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" id="Vector6">
          <path
            fill="white"
            d="M 52.5531864049783 405.0406494140625 C 52.5688165221809 403.8293153805226 52.602583318281766 402.62453983446227 52.65422874781603 401.42623682282414 M 52.65422874781603 401.42623682282414 C 57.93241321019629 278.95915775693237 249.9522234125908 224.18226113731157 353.3841767393855 162.68221251660313 C 457.8281779497374 100.58040173421145 408.6304698563067 94.9347511067491 165.86873731332676 16.299310184068556 C -28.340651182352957 -46.60904255407587 -12.640445699589883 87.67609963650784 19.485829065441777 162.68221251660313 L 52.65422874781603 401.42623682282414 Z"
          ></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" id="Vector8">
          <path
            fill="white"
            d="M 52.5531864049783 405.0406494140625 C 52.5688165221809 403.8293153805226 52.602583318281766 402.62453983446227 52.65422874781603 401.42623682282414 M 52.65422874781603 401.42623682282414 C 57.93241321019629 278.95915775693237 249.9522234125908 224.18226113731157 353.3841767393855 162.68221251660313 C 457.8281779497374 100.58040173421145 408.6304698563067 94.9347511067491 165.86873731332676 16.299310184068556 C -28.340651182352957 -46.60904255407587 -12.640445699589883 87.67609963650784 19.485829065441777 162.68221251660313 L 52.65422874781603 401.42623682282414 Z"
          ></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" id="Vector7">
          <defs>
            <linearGradient id="linear-gradient">
              <stop offset="0%" style="stop-color: rgba(0, 25, 255, 0.47)" />
              <stop offset="100%" style="stop-color: rgba(0, 194, 255, 0.51)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#linear-gradient)"
            d="M 213.72695425961876 162.6822111455513 C 181.6006802140713 87.67609889759191 165.90047200630275 -46.60904216126457 360.1098561525647 16.29931004670136 C 602.8715832587726 94.93475030665878 652.0692902503956 100.58040088654073 547.6252913791201 162.6822111455513 C 443.1812925078446 224.78402140456186 248.40734866681734 280.03045892053194 246.79431393521463 405.0406460004642 C 245.5038861307036 505.0487956644101 81.72709511895037 319.01212605835156 0 213.49277870056798 L 213.72695425961876 162.6822111455513 Z"
          ></path>
        </svg>
      </div>
      <span id="heading"> Ultimate artwork automation solution with HTML </span>
    </div>
  </body>
</html>
`,
} as const;
