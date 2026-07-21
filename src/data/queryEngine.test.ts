import { describe, expect, it } from 'vitest';
import { generateQuerySuggestions, processQuery } from './queryEngine';
import { getDefaultQuests } from './quests';
import { cosmicCoffeeOntology } from './ontology';
import type { Ontology } from './ontology';

const testOntology: Ontology = {
  name: 'Incident Management Ontology',
  description: 'Test ontology for query handling.',
  entityTypes: [
    {
      id: 'service',
      name: 'Service',
      description: 'Business or IT service being disrupted.',
      icon: '⚙️',
      color: '#E74C3C',
      properties: [
        { name: 'serviceId', type: 'string', isIdentifier: true },
      ],
    },
    {
      id: 'configurationitem',
      name: 'ConfigurationItem',
      description: 'Underlying asset or component causing the incident.',
      icon: '🧩',
      color: '#00A9E0',
      properties: [
        { name: 'ciId', type: 'string', isIdentifier: true },
      ],
    },
    {
      id: 'problem',
      name: 'Problem',
      description: 'Known error or root cause for recurring incidents.',
      icon: '⚡',
      color: '#FFB900',
      properties: [
        { name: 'problemId', type: 'string', isIdentifier: true },
        { name: 'title', type: 'string' },
      ],
    },
  ],
  relationships: [
    {
      id: 'service_supported_by_configuration_item',
      name: 'is supported by',
      from: 'service',
      to: 'configurationitem',
      cardinality: 'one-to-many',
      description: 'Service is supported by Configuration Item',
    },
  ],
};

describe('processQuery', () => {
  it('answers definition-style entity questions', () => {
    const response = processQuery('What is a Problem?', testOntology);

    expect(response.interpretation).toContain('definition query for Problem');
    expect(response.result).toContain('**Problem**');
    expect(response.result).toContain('Known error or root cause for recurring incidents.');
    expect(response.highlightEntities).toEqual(['problem']);
  });

  it('does not duplicate ontology wording in fallback text', () => {
    const response = processQuery('Completely unknown question', testOntology);

    expect(response.result).toContain('for **Incident Management Ontology**.');
    expect(response.result).not.toContain('Ontology** ontology');
  });

  it('answers relationship-name connection queries', () => {
    const response = processQuery('Show me all is supported by connections', testOntology);

    expect(response.interpretation).toContain('relationship-name query for is supported by');
    expect(response.result).toContain('connects **Service** to **ConfigurationItem**');
    expect(response.highlightRelationships).toEqual(['service_supported_by_configuration_item']);
  });

  it('accepts Korean questions and localizes generated guidance', () => {
    const suggestions = generateQuerySuggestions(testOntology, 'ko');
    const response = processQuery('Problem 엔터티를 모두 보여줘', testOntology, 'ko');

    expect(suggestions[0]).toContain('Service 엔터티');
    expect(response.interpretation).toContain('감지됨');
    expect(response.result).toContain('**속성:**');
    expect(response.result).toContain('Problem');
  });

  it('returns meaningful results for every localized default query quest prompt', () => {
    const queryQuest = getDefaultQuests('ko').find((quest) => quest.id === 'quest-4');
    const prompts = queryQuest?.steps.map((step) => step.instruction.match(/'(.+)'/)?.[1]) ?? [];

    expect(prompts).toHaveLength(3);
    for (const prompt of prompts) {
      expect(prompt).toBeTruthy();
      const response = processQuery(prompt!, cosmicCoffeeOntology, 'ko');
      expect(response.result).not.toContain('해석하지 못했습니다');
      expect(response.interpretation).toBe('감지됨: Fourth Coffee 샘플 쿼리');
      expect(response.highlightEntities.length).toBeGreaterThan(0);
    }
  });
});
