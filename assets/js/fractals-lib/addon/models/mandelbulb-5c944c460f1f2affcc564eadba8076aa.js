export default class Mandelbulb{constructor(){this.xMin=-2,this.xMax=2,this.yMin=-2,this.yMax=2,this.zMin=-2,this.zMax=1.5,this.nb=100,this.step=.001,this.xI=this.xMin,this.power=2,this.maxIterations=150,this.colorsService=null}initialize(t){this.xI=this.xMin,this.colorsService=t}getInterval(){return[[this.xMin,this.yMin,0],[this.xMax,this.yMin,0],[this.xMin,this.yMax,0],[this.xMax,this.yMax,0],[this.xMin,this.yMin,-2],[this.xMax,this.yMin,2],[this.xMin,this.yMax,.5],[this.xMax,this.yMax,0]]}getNextPts(){return this.xI+=this.step,this.xI>this.xMax?null:this.getPts(this.nb,this.xI,this.xI,5*this.step)}getInitPts(){const t=[];return this.getPoint(0,0,0,t),this.getPoint(this.xMin,this.yMin,0,t),this.getPoint(this.xMax,this.yMax,t),this.getPoint(this.xMin,this.yMax,t),t}getPts(t,i,s,h){const x=[];for(let t=i;t<=s;t+=h){let i=this.yMin;for(;i<=this.yMax;){for(let s=this.zMin;s<=this.zMax;s+=h)this.getPoint(t,i,s,x);i+=h}}return x}getPoint(t,i,s,h){let x=t,n=i,e=0;for(;e<this.maxIterations;){const t=Math.pow(x,this.power)-Math.pow(n,this.power),i=2*x*n,s=t*t+i*i;if(Math.abs(s)>2)break;x=t,n=i,e++}e===this.maxIterations&&h.push([t,i,s])}}