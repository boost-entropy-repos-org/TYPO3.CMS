/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","TYPO3/CMS/Core/Ajax/AjaxRequest","../SvgTree","../ContextMenu","../Storage/Persistent","./FileStorageTreeActions"],(function(e,t,i,r,s,o,d){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FileStorageTree=void 0,i=__importDefault(i),o=__importDefault(o);class n extends r.SvgTree{constructor(){super(),this.searchQuery="",this.networkErrorTitle=TYPO3.lang.tree_networkError,this.networkErrorMessage=TYPO3.lang.tree_networkErrorDescription,this.originalNodes="",this.settings.defaultProperties={hasChildren:!1,nameSourceField:"title",itemType:"sys_file",prefix:"",suffix:"",locked:!1,loaded:!1,overlayIcon:"",selectable:!0,expanded:!1,checked:!1,backgroundColor:"",class:"",readableRootline:""}}initialize(e,t,i){return!!super.initialize(e,t)&&(this.dispatch.on("nodeSelectedAfter.fileStorageTree",e=>this.nodeSelectedAfter(e)),this.dispatch.on("nodeRightClick.fileStorageTree",e=>this.nodeRightClick(e)),this.dispatch.on("prepareLoadedNode.fileStorageTree",e=>this.prepareLoadedNode(e)),this.actionHandler=i,!0)}getFirstNode(){return this.nodes[0]}hideChildren(e){super.hideChildren(e),o.default.set("BackendComponents.States.FileStorageTree.stateHash."+e.stateIdentifier,"0")}showChildren(e){this.loadChildrenOfNode(e),super.showChildren(e),o.default.set("BackendComponents.States.FileStorageTree.stateHash."+e.stateIdentifier,"1")}updateNodeBgClass(e){return super.updateNodeBgClass.call(this,e).call(this.initializeDragForNode())}nodesUpdate(e){return super.nodesUpdate.call(this,e).call(this.initializeDragForNode())}selectNode(e){this.isNodeSelectable(e)&&(this.getSelectedNodes().forEach(e=>{!0===e.checked&&(e.checked=!1,this.dispatch.call("nodeSelectedAfter",this,e))}),e.checked=!0,this.dispatch.call("nodeSelectedAfter",this,e),this.update())}selectNodeByIdentifier(e){e=encodeURIComponent(e);let t=this.nodes.filter(t=>t.identifier===e)[0];t&&0===this.getSelectedNodes().filter(e=>e.identifier===t.identifier).length&&this.selectNode(t)}filterTree(){this.nodesAddPlaceholder(),new i.default(this.settings.filterUrl+"&q="+this.searchQuery).get({cache:"no-cache"}).then(e=>e.resolve()).then(e=>{let t=Array.isArray(e)?e:[];t.length&&""===this.originalNodes&&(this.originalNodes=JSON.stringify(this.nodes)),this.replaceData(t),this.nodesRemovePlaceholder()}).catch(e=>{throw this.errorNotification(e),this.nodesRemovePlaceholder(),e})}refreshOrFilterTree(){""!==this.searchQuery?this.filterTree():this.refreshTree()}resetFilter(){if(this.searchQuery="",this.originalNodes.length>0){let e=this.getSelectedNodes()[0];if(void 0===e)return void this.refreshTree();this.nodes=JSON.parse(this.originalNodes),this.originalNodes="";let t=this.getNodeByIdentifier(e.stateIdentifier);t?this.selectNode(t):this.refreshTree()}else this.refreshTree()}initializeDragForNode(){return this.actionHandler.connectDragHandler(new d.FileStorageTreeNodeDragHandler(this,this.actionHandler))}getNodeTitle(e){return decodeURIComponent(e.name)}loadChildrenOfNode(e){if(e.loaded)return this.prepareDataForVisibleNodes(),void this.update();this.nodesAddPlaceholder(),new i.default(this.settings.dataUrl+"&parent="+e.identifier+"&currentDepth="+e.depth).get({cache:"no-cache"}).then(e=>e.resolve()).then(t=>{let i=Array.isArray(t)?t:[];const r=this.nodes.indexOf(e)+1;i.forEach((e,t)=>{this.nodes.splice(r+t,0,e)}),e.loaded=!0,this.setParametersNode(),this.prepareDataForVisibleNodes(),this.update(),this.nodesRemovePlaceholder(),this.switchFocusNode(e)}).catch(e=>{throw this.errorNotification(e,!1),this.nodesRemovePlaceholder(),e})}getNodeByIdentifier(e){return this.nodes.find(t=>t.stateIdentifier===e)}nodeSelectedAfter(e){if(!e.checked)return;window.fsMod.recentIds.file=e.identifier,window.fsMod.navFrameHighlightedID.file=e.stateIdentifier;const t=-1!==window.currentSubScript.indexOf("?")?"&":"?";TYPO3.Backend.ContentContainer.setUrl(window.currentSubScript+t+"id="+e.identifier)}nodeRightClick(e){s.show(e.itemType,decodeURIComponent(e.identifier),"tree","","",this.getNodeElement(e))}prepareLoadedNode(e){e.stateIdentifier===window.fsMod.navFrameHighlightedID.file&&(e.checked=!0)}}t.FileStorageTree=n}));