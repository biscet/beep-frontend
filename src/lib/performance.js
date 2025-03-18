export const getHardwareInfo = () => {
  const cpuCores = navigator.hardwareConcurrency || 3;
  const memory = navigator.deviceMemory || 6;
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : '';
  const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const maxAnisotropy = gl.getExtension('EXT_texture_filter_anisotropic') ? gl.getParameter(gl.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT) : null;
  const maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
  const maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
  const maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  const maxCombinedTextureImageUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  const maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

  return {
    cpuCores,
    memory,
    webGL: gl,
    integratetGPU: vendor.includes('Intel') || vendor.includes('AMD') || renderer.includes('Intel') || renderer.includes('AMD'),
    maxTextureSize,
    maxAnisotropy,
    maxRenderbufferSize,
    maxVertexAttribs,
    maxVertexTextures,
    maxCombinedTextureImageUnits,
    maxCubeMapTextureSize,
  };
};