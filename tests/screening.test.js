import test from 'node:test';
import assert from 'node:assert/strict';
import {classify} from '../screening.js';
test('boundary cases match supplied chart',()=>{for(const [h,f,n,want] of [[89,100,1,'fail'],[100,89,1,'fail'],[90,90,1,'repeat'],[94,94,2,'repeat'],[95,92,1,'pass'],[92,95,3,'pass'],[95,91,1,'repeat'],[95,95,1,'pass'],[94,94,3,'fail'],[90,94,3,'fail']])assert.equal(classify(h,f,n),want);});
test('all whole-number readings and attempts obey chart, symmetrically',()=>{for(let h=1;h<=100;h++)for(let f=1;f<=100;f++)for(let n=1;n<=3;n++){const expected=h<90||f<90?'fail':(h>=95||f>=95)&&Math.abs(h-f)<=3?'pass':n===3?'fail':'repeat';assert.equal(classify(h,f,n),expected);assert.equal(classify(h,f,n),classify(f,h,n));}});
test('invalid input is rejected',()=>{for(const v of [NaN,Infinity,0,-1,101,94.5,'95',null,undefined])assert.throws(()=>classify(v,95));for(const n of [0,4,1.5])assert.throws(()=>classify(95,95,n));});
