export class Option {
  id: number;
  name: string;
  requirementId: string;     
  isAnswer: boolean;        
  isSelected: boolean;       

  constructor(data: any) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.requirementId = data.requirementId || data.questionId || '';
    this.isAnswer = data.isAnswer || false;
    this.isSelected = data.isSelected || false;
  }
}