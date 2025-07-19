# Security Guidelines

> This document is a granulated shard from the main "Operational Guidelines" focusing on "Security Guidelines".

## Security Best Practices

- **Dependency Security:** Sử dụng `npm audit` hoặc các công cụ tương tự (như Dependabot của GitHub) để kiểm tra các lỗ hổng trong các thư viện phụ thuộc.
- **Cross-Site Scripting (XSS):** React và JSX đã có cơ chế tự động thoát các chuỗi ký tự để chống XSS. Không sử dụng các thuộc tính như `dangerouslySetInnerHTML`.
