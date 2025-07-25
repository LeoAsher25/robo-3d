# 3D Models Directory

This directory contains 3D models for the Yasuo Three.js Meme Simulator.

## Available Models

### Yasuo_Base.glb

- **Status**: ✅ Active - Real Yasuo character model
- **Description**: High-quality Yasuo character 3D model
- **Format**: GLB/GLTF format for optimal web loading
- **File Size**: 26MB
- **Requirements**:
  - Optimized for web delivery (compressed textures, reasonable polygon count)
  - Accessible via `/models/Yasuo_Base.glb` web path
  - Properly scaled and textured for the scene
- **Current Implementation**: Using real Yasuo model with fallback to placeholder

### yasuo-wheelchair.glb (Legacy)

- **Status**: ❌ Deprecated - Replaced by Yasuo_Base.glb
- **Description**: Yasuo character in a wheelchair 3D model (placeholder)
- **Format**: GLB/GLTF format for optimal web loading
- **Requirements**:
  - Optimized for web delivery (compressed textures, reasonable polygon count)
  - Accessible via `/models/yasuo-wheelchair.glb` web path
  - Properly scaled and textured for the scene
- **Current Implementation**: Fallback placeholder character made of basic Three.js geometries

## Model Specifications

- **Format**: GLB/GLTF (preferred for web)
- **Optimization**: Draco compression recommended
- **Textures**: Compressed formats (KTX2, WebP)
- **Polygon Count**: Reasonable for web performance
- **File Size**: Under 5MB recommended for fast loading

## Development Notes

For development purposes, you can use any GLB model as a placeholder until the final Yasuo model is available. The Character component is designed to work with any GLB/GLTF model.
