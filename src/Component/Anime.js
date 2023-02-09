const scroll={

  up:{

    y:"-100vh"

  },

  down:{

    y:0,


  }


}

const image={


    animate:{


        y:5,
    }
}


const Button={


    animate:{


        scale:1.1,
    }
 
}


const imagechange={

    hidden:{

        opacity:0,
    },
    visible:{

        opacity:1,
        transition:{
            delay:1,
            duration:1,
        }
    }

}
const main={
    animate:{
        y:-30,
    }
}
export  {scroll,Button,main,image,imagechange};