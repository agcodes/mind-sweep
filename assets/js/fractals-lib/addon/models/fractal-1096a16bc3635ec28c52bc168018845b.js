import CComplex from"./CComplex";export default class Fractal{constructor(){this.lastZ=null,this.colorsService=null,this.lastDz=null,this.minResult=1/0;const t=1e-5;this.cDerivative=new CComplex(t,t),this.minLp=1/0,this.maxLp=0}initResults(){this.lastZ=null,this.minResult=1/0,this.minLp=1/0,this.maxLp=0}setMinLp(t){if(t&&this.params.lpNb>0){const s=t.LyapunovExponent(this.params.lpNb);Math.abs(s)<Math.abs(this.minLp)&&(this.minLp=s),Math.abs(s)>Math.abs(this.maxLp)&&(this.maxLp=s)}}setResult(t){return t<this.minResult&&(this.minResult=t),t}saveZ(t){t&&(this.lastZ=new CComplex(t.r,t.i,t.t),this.setMinLp(t))}saveDz(t){t&&(this.lastDz=new CComplex(t.r,t.i))}addNoise(t,s){return t&&this.params.noise?t.addValuesIn(this.params.noise[0]*s,this.params.noise[1]*s,this.params.noise[2]*s):t}get3DValue(t){let s=null;if(this.params.render3D)if(this.params.zThresholds&&this.params.zValues){for(let a=0;a<this.params.zThresholds.length;a++)if(this.params.zThresholds[a]>=t){s=this.params.zValues[a];break}}else s=-Math.log10(t);return s}getLastMagnitude(){return null==this.lastZ?0:this.lastZ.getMagnitude()}getLastArgument(){return null==this.lastZ?0:this.lastZ.getArgument()}getLastSquaresSum(){return null==this.lastZ?0:this.lastZ.squaresSum()}getDzSquaresSum(){return null==this.lastDz?0:this.lastDz.squaresSum()}getDzMagnitude(){return null==this.lastDz?0:this.lastDz.getMagnitude()}getV=(t,s,a,e)=>{switch(t){case 11:case 13:return this.getLastMagnitude();case 12:return this.getLastArgument();case 14:return this.getLastSquaresSum();case 16:return this.minResult==1/0?1e4:Math.sqrt(100*this.minResult);case 17:return this.getLastArgument()*this.getLastSquaresSum();case 18:return 100*Math.tanh(this.getLastMagnitude()*Math.log(this.getLastMagnitude())/this.getDzMagnitude()*1e3);case 19:return Math.log(this.getDzMagnitude());case 20:return Math.abs(Math.sin(this.getLastSquaresSum()*Math.PI));case 21:return Math.log(this.getLastArgument());case 22:return Math.log(this.getLastSquaresSum());case 25:return this.lastZ.i/2/Math.PI-.09;case 26:return this.colorsService.lerpForPoint(a,e+s/10,.1);case 27:return this.colorsService.lerpForPoint(a+2*this.getLastSquaresSum(),e+2*this.getLastSquaresSum(),.1);case 28:return this.minLp==1/0?(Math.sin(Math.log(s))+1)/2:Math.abs(this.minLp)/Math.sqrt(Math.pow(this.params.x2-this.params.x1,2)+Math.pow(this.params.y2-this.params.y1,2))*4;case 29:return this.minLp==1/0?(Math.sin(Math.log(s))+1)/2:10*Math.log(1+Math.abs(this.minLp));case 32:if(this.minLp==1/0)return Math.log(1+s);const t=10*Math.log10(1+Math.abs(this.minLp));return t>10?Math.log(1+s):t;case 31:return 0==this.maxLp?(Math.sin(Math.log(s))+1)/2:Math.abs(this.maxLp)/Math.sqrt(Math.pow(this.params.x2-this.params.x1,2)+Math.pow(this.params.y2-this.params.y1,2))*4;case 50:return Math.floor(Math.random()*s);default:return s}}}