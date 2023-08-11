import React from 'react'
import { Img, ImgProps } from 'react-image'
import bikeImg from './bike.png'
import motorImg from './motor.png'
import walkImg from './walk2.png'

export const BikeImg = ({ className, loader, alt }: Partial<ImgProps>) => <Img src={bikeImg} className={className} alt={alt} loader={loader} />
export const MotorImg = ({ className, loader, alt }: Partial<ImgProps>) => <Img src={motorImg} className={className} alt={alt} loader={loader} />
export const WalkingImg = ({ className, loader, alt }: Partial<ImgProps>) => <Img src={walkImg} className={className} alt={alt} loader={loader} />