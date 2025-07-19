# Infrastructure and Deployment

> This document is a granulated shard from the main "Yasuo Three.js Meme Simulator Architecture Document" focusing on "Infrastructure and Deployment".

## Infrastructure and Deployment Overview

- **Cloud Provider(s):** Vercel hoặc Netlify được khuyến nghị.
- **Deployment Strategy:** CI/CD tích hợp. Mỗi lần push lên nhánh `main` sẽ tự động build và triển khai phiên bản mới.
- **Environments:** Một môi trường production duy nhất là đủ cho MVP.
- **Rollback Strategy:** Sử dụng tính năng rollback của Vercel/Netlify để quay lại phiên bản triển khai trước đó nếu có lỗi.
