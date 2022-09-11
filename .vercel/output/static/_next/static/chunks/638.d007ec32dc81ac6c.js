"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[638],{1638:function(e,n,s){s.r(n),s.d(n,{default:function(){return y}});var t=s(7568),l=s(4924),r=s(6042),i=s(9396),o=s(797),a=s(4051),c=s.n(a),d=s(5893),u=s(7294),f=s(5979),x=s.n(f),h=s(1983),m=s(6022);function v(e){var n=e.registerDetail,s=e.isRegister,t=e.handleRegister,l=e.handleUnRegister,r=e.handleRegisterDetailChange,i=e.handleCall,o=e.handleHangUp;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"form-control w-full ",children:[(0,d.jsx)("label",{className:"label",children:(0,d.jsx)("span",{className:"label-text text-xs",children:"Domain"})}),(0,d.jsx)(h.II,{className:"w-full",size:"xs",value:n.server,onChange:function(e){return r("server",e.target.value)},placeholder:"server",disabled:s})]}),(0,d.jsxs)("div",{className:"form-control w-full ",children:[(0,d.jsx)("label",{className:"label",children:(0,d.jsx)("span",{className:"label-text text-xs",children:"Websocket"})}),(0,d.jsx)(h.II,{className:"w-full",size:"xs",value:n.websocket,onChange:function(e){return r("websocket",e.target.value)},placeholder:"websocket",disabled:s})]}),(0,d.jsxs)("div",{className:"form-control w-full ",children:[(0,d.jsx)("label",{className:"label",children:(0,d.jsx)("span",{className:"label-text text-xs",children:"Extension"})}),(0,d.jsx)(h.II,{className:"w-full",size:"xs",value:n.extension,onChange:function(e){return r("extension",e.target.value)},placeholder:"extension",disabled:s})]}),(0,d.jsxs)("div",{className:"form-control w-full mb-2",children:[(0,d.jsx)("label",{className:"label",children:(0,d.jsx)("span",{className:"label-text text-xs ",children:"Password"})}),(0,d.jsx)(h.II,{className:"w-full",size:"xs",value:n.password,onChange:function(e){return r("password",e.target.value)},placeholder:"password",disabled:s})]}),(0,d.jsx)("button",{className:"btn btn-info w-full m-2",disabled:s,onClick:t,children:"Register"}),(0,d.jsx)("button",{className:"btn btn-error w-full m-2",disabled:!s,onClick:l,children:"Unregister"}),(0,d.jsx)(h.l0,{className:"w-full mb-2",children:(0,d.jsxs)(h.BZ,{className:"w-full",children:[(0,d.jsx)("span",{children:(0,d.jsx)(m.Z,{})}),(0,d.jsx)(h.II,{type:"text",placeholder:"Type here",className:"input input-bordered input-info w-full text-center",value:n.destination,onChange:function(e){return r("destination",e.target.value)},bordered:!0})]})}),(0,d.jsx)("button",{className:"btn btn-success w-full m-2",onClick:i,children:"Call"}),(0,d.jsx)("button",{className:"btn btn-warning w-full m-2",onClick:o,children:"HangUp"})]})}var g=s(9956),p=s(4521),j=s(642),w=s(2173),b=s(5572);function N(e){var n=e.isVideoMuted,s=e.isMicrophoneMuted,t=e.handleMuteVideo,l=e.handleMutedMicrophone,r=e.callOutRef,i=e.localVideoRef,o=e.remoteVideoRef,a=(0,u.useRef)(null),c=(0,u.useRef)(null);return(0,d.jsxs)("div",{className:"flex flex-col w-full max-w-full pt-3 pb-4 bg-slate-500 items-center",children:[(0,d.jsx)("div",{className:"hidden top-[40%] justify-center items-center text-6xl bg-gray-800 text-white p-3 rounded-xl shadow-md",ref:r}),(0,d.jsx)("div",{className:"flex flex-1 h-1/2 w-full self-center items-center justify-center pb-2",children:(0,d.jsxs)("div",{className:"flex h-full items-center justify-center rounded-2xl animate__animated animate__zoomIn",onMouseOver:function(){a.current.classList.replace("hidden","flex")},onMouseLeave:function(){a.current.classList.replace("flex","hidden")},children:[(0,d.jsxs)("div",{className:"fixed hidden flex-row rounded-xl cursor-pointer bg-slate-200 z-50",ref:a,children:[(0,d.jsx)("div",{className:"rounded-xl cursor-pointer m-2 bg-slate-200 z-50 ",onClick:function(){return t(!n)},children:n?(0,d.jsx)(p.Z,{fontSize:"large",color:"error"}):(0,d.jsx)(g.Z,{fontSize:"large"})}),(0,d.jsx)("div",{className:"rounded-xl cursor-pointer m-2 bg-slate-200 z-50",onClick:function(){return l(!s)},children:s?(0,d.jsx)(w.Z,{fontSize:"large",color:"error"}):(0,d.jsx)(j.Z,{fontSize:"large"})})]}),(0,d.jsx)("video",{autoPlay:!0,playsInline:!0,ref:i,className:"w-full h-full rounded-2xl hidden",muted:!0})]})}),(0,d.jsx)("div",{className:"flex flex-1 h-1/2 w-full self-center items-center justify-center pt-2",children:(0,d.jsxs)("div",{className:"flex h-full items-center justify-center rounded-2xl animate__animated animate__zoomIn",onMouseOver:function(){c.current.classList.replace("hidden","flex")},onMouseLeave:function(){c.current.classList.replace("flex","hidden")},children:[(0,d.jsx)("div",{className:"fixed hidden flex-row rounded-xl cursor-pointer bg-slate-200 z-50",ref:c,children:(0,d.jsx)("div",{className:"rounded-xl cursor-pointer m-2 bg-slate-200 z-50",children:(0,d.jsx)(b.Z,{fontSize:"large",color:"error"})})}),(0,d.jsx)("video",{autoPlay:!0,playsInline:!0,ref:o,className:"w-full h-full rounded-2xl hidden"})]})})]})}function C(e){var n=e.callID,s=e.view,t=e.displayName,l=e.handleAcceptCall,r=e.handleDeclineCall;return(0,d.jsxs)("div",{className:"alert shadow-lg ".concat(s?"":"hidden"),children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",className:"stroke-info flex-shrink-0 w-6 h-6",children:(0,d.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,d.jsx)("span",{children:t})]}),(0,d.jsxs)("div",{className:"flex-none",children:[(0,d.jsx)("button",{className:"btn btn-sm btn-ghost",onClick:function(){return r(n)},children:"Deny"}),(0,d.jsx)("button",{className:"btn btn-sm btn-primary",onClick:function(){return l(n)},children:"Accept"})]})]})}var Z=null,k=null,I={audio:!0,video:!0},S=[{urls:"turn:turn.ttrs.in.th?transport=tcp",username:"turn01",credential:"Test1234"}];function y(){var e=(0,u.useRef)(null),n=(0,u.useRef)(null),s=(0,u.useRef)(null),a=(0,u.useRef)(null),f=(0,u.useState)({server:"test-135-sip.ttrs.in.th",websocket:"wss://test-135-sip.ttrs.in.th:443/ws",extension:"User2",password:"test1234",destination:"9999"}),h=f[0],m=f[1],g=(0,u.useState)(!1),p=g[0],j=g[1],w=(0,u.useState)([]),b=w[0],y=w[1],R=(0,u.useState)({video:!1,audio:!1}),L=R[0],M=R[1];(0,u.useEffect)((function(){null!==localStorage.getItem("registerDetail")&&m(JSON.parse(localStorage.getItem("registerDetail")))}),[]);var _=function(){var e=(0,t.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:b.forEach((function(e){e.session.session.terminate()})),n.current.classList.add("hidden"),s.current.classList.add("hidden");case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=function(e){var n=b.find((function(n){return n.call_id===e}));n.session.session.answer({mediaConstraints:I,pcConfig:{iceServers:S}}),n.view=!1;var s=b.findIndex((function(n){return n.call_id===e})),t=(0,o.Z)(b);t[s]=n,y(t)},D=function(e){var n=b.find((function(n){return n.call_id===e}));n.session.session.terminate(),n.view=!1;var s=b.findIndex((function(n){return n.call_id===e})),t=(0,o.Z)(b);t[s]=n,y(t)},O=function(e){a.current.className="fixed bottom-0 h-[10px] w-full "+e};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:"flex flex-row w-screen h-screen bg-slate-200 shadow-xl",children:[(0,d.jsx)("div",{className:"flex w-1/4 min-w-[250px] px-3 h-full flex-col items-center self-start ",children:(0,d.jsx)(v,{registerDetail:h,isRegister:p,handleRegister:function(){localStorage.setItem("registerDetail",JSON.stringify(h)),function(){console.log("registerSip");var t={sockets:[new(x().WebSocketInterface)(h.websocket)],uri:"sip:"+h.extension+"@"+h.server,password:h.password};(Z=new(x().UA)(t)).start(),Z.on("registered",(function(e){j(!0),O("bg-green-500")})),Z.on("unregistered",(function(e){j(!1),O("bg-red-500"),console.log(e)})),Z.on("registrationFailed",(function(e){})),Z.on("newRTCSession",(function(t){console.log(" *** newRTCSession",t.originator,t.request.method,t),k=t.session,"remote"===t.originator&&(console.log(t.originator),y((0,o.Z)(b).concat([{callID:t.request.call_id,displayName:t.request.from._uri._user,session:t,view:!0}]))),k.on("ended",(function(e){console.log("ended",e)})),k.on("confirmed",(function(){console.log("add localVideo"),n.current.srcObject=k.connection.getLocalStreams()[0],n.current.classList.remove("hidden"),e.current.classList.replace("fixed","hidden")})),k.on("muted",(function(e){e.video&&M((function(e){return(0,i.Z)((0,r.Z)({},e),{video:!0})})),e.audio&&M((function(e){return(0,i.Z)((0,r.Z)({},e),{audio:!0})}))})),k.on("unmuted",(function(e){e.video&&M((function(e){return(0,i.Z)((0,r.Z)({},e),{video:!1})})),e.audio&&M((function(e){return(0,i.Z)((0,r.Z)({},e),{audio:!1})}))})),k.on("peerconnection",(function(e){e.peerconnection.onaddstream=function(e){console.log(t),s.current.srcObject=e.stream,s.current.classList.remove("hidden")},e.peerconnection.onremovestream=function(e){s.current.stop(),s.current.srcObject=null,n.current.srcObject=null}}))}))}()},handleUnRegister:function(){Z.stop()},handleRegisterDetailChange:function(e,n){m((function(s){return(0,i.Z)((0,r.Z)({},s),(0,l.Z)({},e,n))}))},handleCall:function(){try{localStorage.setItem("destination",JSON.stringify(h)),e.current.innerText="Call "+h.destination,e.current.classList.replace("hidden","fixed"),function(){var t={eventHandlers:{progress:function(n){e.current.innerText="Call "+h.destination,console.log("call is in progress")},failed:function(n){e.current.innerText=n.cause,console.log("call failed with cause: "+n)},ended:function(e){console.log("call ended with cause: "+e),n.current.classList.add("hidden"),s.current.classList.add("hidden")},confirmed:function(s){console.log("call confirmed"),e.current.innerText="",console.log("add localVideo"),n.current.srcObject=l.connection.getLocalStreams()[0],n.current.classList.remove("hidden")},muted:function(e){console.log("muted",e),e.video&&M((function(e){return(0,i.Z)((0,r.Z)({},e),{video:!0})})),e.audio&&M((function(e){return(0,i.Z)((0,r.Z)({},e),{audio:!0})}))},unmuted:function(e){e.video&&M((function(e){return(0,i.Z)((0,r.Z)({},e),{video:!1})})),e.audio&&M((function(e){return(0,i.Z)((0,r.Z)({},e),{audio:!1})}))}},mediaConstraints:I,pcConfig:{iceServers:S}},l=Z.call("sip:"+h.destination+"@"+h.server,t);l.connection.addEventListener("addstream",(function(e){console.log(e),s.current.srcObject=e.stream,s.current.classList.remove("hidden")}))}()}catch(t){console.log(t)}},handleHangUp:_})}),(0,d.jsx)(N,{isVideoMuted:L.video,isMicrophoneMuted:L.audio,handleMuteVideo:function(e){e?k.mute({video:!0}):e||k.unmute({video:!0})},handleMutedMicrophone:function(e){console.log("handleMutedMicrophone"),e?k.mute({audio:!0}):e||k.unmute({audio:!0})},destination:h.destination,callOutRef:e,localVideoRef:n,remoteVideoRef:s})]}),(0,d.jsx)("div",{className:"fixed flex top-10 w-full justify-center ",children:(0,d.jsx)("div",{className:"flex flex-col w-1/2",children:b.map((function(e,n){return(0,d.jsx)(C,{view:e.view,callID:e.call_id,displayName:e.displayName,handleAcceptCall:z,handleDeclineCall:D},n)}))})}),(0,d.jsx)("div",{className:"fixed bottom-0 w-full h-[10px] ",ref:a})]})}}}]);