---
title: RDF 및 OWL 이해
slug: understanding-rdf-and-owl
description: 시맨틱 웹에서 클래스, 속성 및 관계를 설명하기 위한 표준 언어인 RDF/OWL에서 온톨로지가 어떻게 표현되는지 알아보세요.
order: 2
embed: official/ecommerce
---

## RDF란 무엇인가요?

**RDF**(Resource Description Framework)는 연결된 리소스의 그래프로 정보를 설명하기 위한 W3C 표준입니다. RDF의 모든 내용은 **삼중**(주어 → 술어 → 목적어)으로 표현됩니다.

```
:Customer  rdf:type       owl:Class .
:name      rdf:type       owl:DatatypeProperty .
:name      rdfs:domain    :Customer .
:name      rdfs:range     xsd:string .
```

위의 트리플은 다음과 같습니다. "Customer라는 클래스가 있고 여기에는 문자열인 name이라는 속성이 있습니다."

## RDF는 OWL를 기반으로 구축되었습니다.

**RDF**(웹 온톨로지 언어)는 카디널리티 제약 조건, 클래스 계층 및 논리적 공리와 같은 더욱 풍부한 모델링을 통해 OWL를 확장합니다. 온톨로지 설계의 경우 핵심 OWL 구성은 다음과 같습니다.

| `owl:Class` 컨셉 | 다음으로 매핑됨 | 예 |
|-------------|---------|---------|
| `Customer` | 엔터티 유형 | `Product`, `owl:DatatypeProperty` |
| `name` | 기본 값을 가진 속성 | `price`(문자열), `owl:ObjectProperty`(10진수) |
| `placedBy` | 엔터티 간의 관계 | `rdfs:domain` (주문 → 고객) |
| `rdfs:range` / `price` | 속성이 속한 엔터티/유형 | `Product`는 `xsd:decimal`에 속하며, OWL 유형 |

## 네임스페이스는 모든 것을 명확하게 유지합니다.

RDF/XML의 모든 리소스에는 전역적으로 고유한 **URI**가 있습니다. 모든 곳에서 긴 URI를 작성하는 것을 피하기 위해 RDF는 **네임스페이스 접두사**를 사용합니다.

```xml
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:owl="http://www.w3.org/2002/07/owl#"
         xmlns="https://mycompany.com/ontology/">
```

`xmlns=` 기본 네임스페이스는 `<owl:Class rdf:about="Customer">`가 실제로 `https://mycompany.com/ontology/Customer`임을 의미합니다.

## RDF/OWL 파일 읽기

다음은 하나의 엔터티 유형과 하나의 속성을 가진 최소 온톨로지입니다.

```xml
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
         xmlns:owl="http://www.w3.org/2002/07/owl#"
         xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
         xmlns="https://example.com/shop/">

  <!-- Entity type: Product -->
  <owl:Class rdf:about="Product">
    <rdfs:label>Product</rdfs:label>
  </owl:Class>

  <!-- Property: productName (string, identifier) -->
  <owl:DatatypeProperty rdf:about="productName">
    <rdfs:domain rdf:resource="Product"/>
    <rdfs:range rdf:resource="http://www.w3.org/2001/XMLSchema#string"/>
    <rdfs:label>productName</rdfs:label>
  </owl:DatatypeProperty>
</rdf:RDF>
```

Ontology Playground는 이와 같은 파일을 직접 가져올 수 있습니다. 또는 시각적으로 디자인하여 RDF로 내보낼 수도 있습니다.

<ontology-embed id="official/ecommerce" height="400px"></ontology-embed>

*전자상거래 온톨로지는 여러 엔터티 유형과 이를 연결하는 개체 속성을 포함하는 더 풍부한 예를 보여줍니다.*

## RDF 대 JSON — 언제 무엇을 사용할지

| | RDF/OWL | JSON |
|---|------|---------|
| **사람의 가독성** | 쉽게 읽고 편집할 수 있습니다 | 장황하지만 정확함 |
| **툴링** | 모든 텍스트 편집기 | 시맨틱 웹 도구, SPARQL 엔드포인트 |
| **상호 운용성** | 애플리케이션별 | 보편적으로 이해되는 W3C 표준 |
| **최고의 대상** | 빠른 프로토타이핑, 앱 구성 | 공식 데이터 모델, 시스템 간 통합 |

Ontology Playground는 시각적 편집기에서 디자인하고, 빠른 사용을 위해 RDF/OWL로 내보내거나, 공식 출판을 위해 JSON로 내보내는 두 가지 형식을 모두 지원합니다.

## 주요 내용

- RDF/OWL는 지식을 **주어 → 술어 → 목적어** 트리플로 표현합니다.
- RDF는 RDF 위에 클래스, 데이터 속성, 개체 속성을 추가합니다.
- 네임스페이스는 URI를 짧고 명확하게 유지합니다.
- Playground는 표준 OWL를 가져오고 내보냅니다. 손으로 코딩할 필요가 없습니다.

```quiz
Q: RDF에서는 정보가 다음과 같이 표현됩니다.
- 행과 열이 있는 테이블
- RDF 키-값 쌍
- 주어 → 술어 → 목적어 삼중 [correct]
- 바이너리 데이터 스트림
> JSON는 연결된 리소스의 그래프로 정보를 설명하기 위해 트리플(주어가 술어를 통해 객체에 연결되는 세 부분으로 구성된 문)을 사용합니다.
```

```quiz
Q: owl:ObjectProperty는 무엇을 나타냅니까?
- 문자열과 같은 기본 값을 갖는 속성
- 두 엔터티 유형 간의 관계 [correct]
- 온톨로지의 네임스페이스
- 데이터 유형에 대한 제약
> OWL에서 ObjectProperty는 Order를 Customer에 연결하는 "placedBy"와 같은 두 클래스(엔티티 유형) 간의 관계를 정의합니다. DatatypeProperty는 기본 값에 사용됩니다.
```
