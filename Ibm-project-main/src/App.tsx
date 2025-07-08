import React, { useState } from 'react';
import { FileText, Download, Search, BookOpen, Scale, Shield, AlertCircle, Users, Clock, CheckCircle, DollarSign, Zap, Edit, Scissors } from 'lucide-react';

interface ClauseTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
  fields: FormField[];
  template: string;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number';
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

const clauseTemplates: ClauseTemplate[] = [
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement',
    category: 'Confidentiality',
    description: 'Standard confidentiality and non-disclosure provisions',
    icon: Shield,
    fields: [
      { name: 'disclosingParty', label: 'Disclosing Party', type: 'text', required: true, placeholder: 'Company Name' },
      { name: 'receivingParty', label: 'Receiving Party', type: 'text', required: true, placeholder: 'Recipient Name' },
      { name: 'purpose', label: 'Purpose', type: 'textarea', required: true, placeholder: 'Purpose of disclosure' },
      { name: 'duration', label: 'Duration (years)', type: 'number', required: true },
      { name: 'exceptions', label: 'Exceptions', type: 'select', options: ['Standard exceptions only', 'Include public domain', 'Include independently developed', 'Custom exceptions'] }
    ],
    template: `**CONFIDENTIALITY AND NON-DISCLOSURE**

The {{receivingParty}} acknowledges that {{disclosingParty}} may disclose certain confidential and proprietary information for the purpose of {{purpose}}.

**1. Confidential Information:** "Confidential Information" means any and all non-public information, including but not limited to technical data, trade secrets, know-how, research, product plans, products, services, customers, customer lists, markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, hardware configuration information, marketing, finances, or other business information disclosed by {{disclosingParty}}.

**2. Obligations:** {{receivingParty}} agrees to:
   a) Hold and maintain the Confidential Information in strict confidence
   b) Not disclose the Confidential Information to any third parties
   c) Not use the Confidential Information for any purpose other than {{purpose}}
   d) Take reasonable precautions to prevent unauthorized disclosure

**3. Duration:** This obligation shall continue for a period of {{duration}} years from the date of disclosure.

**4. Exceptions:** The obligations above do not apply to information that:
   a) Is or becomes publicly available through no breach of this agreement
   b) Is rightfully received from a third party without breach of any confidentiality obligation
   c) Is independently developed without use of or reference to Confidential Information
   d) Is required to be disclosed by law or court order

**5. Return of Information:** Upon termination or upon request, {{receivingParty}} shall return or destroy all Confidential Information and any copies thereof.`
  },
  {
    id: 'arbitration',
    name: 'Arbitration Clause',
    category: 'Dispute Resolution',
    description: 'Mandatory arbitration and dispute resolution provisions',
    icon: Scale,
    fields: [
      { name: 'jurisdiction', label: 'Jurisdiction', type: 'select', required: true, options: ['New York', 'California', 'Delaware', 'Texas', 'Illinois', 'Other'] },
      { name: 'arbitrationRules', label: 'Arbitration Rules', type: 'select', options: ['AAA Commercial Rules', 'JAMS Rules', 'ICC Rules', 'LCIA Rules'] },
      { name: 'numArbitrators', label: 'Number of Arbitrators', type: 'select', options: ['1', '3'] },
      { name: 'language', label: 'Language', type: 'select', options: ['English', 'Spanish', 'French', 'German', 'Other'] },
      { name: 'costs', label: 'Cost Allocation', type: 'select', options: ['Each party bears own costs', 'Loser pays all costs', 'As determined by arbitrator'] }
    ],
    template: `**ARBITRATION AND DISPUTE RESOLUTION**

**1. Mandatory Arbitration:** Any dispute, controversy, or claim arising out of or relating to this agreement, or the breach, termination, or invalidity thereof, shall be settled by arbitration in accordance with the {{arbitrationRules}}.

**2. Jurisdiction and Venue:** The arbitration shall be conducted in {{jurisdiction}}, and the arbitration shall be conducted in the {{language}} language.

**3. Arbitrator(s):** The arbitration shall be conducted by {{numArbitrators}} arbitrator(s) selected in accordance with the applicable arbitration rules.

**4. Binding Decision:** The arbitrator's decision shall be final and binding upon the parties, and judgment may be entered upon the arbitrator's award in any court having jurisdiction.

**5. Costs:** {{costs}}.

**6. Confidentiality:** The arbitration proceedings and any decision or award shall be kept confidential by all parties.

**7. Injunctive Relief:** Notwithstanding the foregoing, each party may seek injunctive relief in any court of competent jurisdiction to protect its intellectual property rights or confidential information.

**8. Survival:** This arbitration clause shall survive the termination of this agreement.`
  },
  {
    id: 'indemnity',
    name: 'Indemnification Clause',
    category: 'Risk Management',
    description: 'Comprehensive indemnification and liability provisions',
    icon: Shield,
    fields: [
      { name: 'indemnifyingParty', label: 'Indemnifying Party', type: 'text', required: true, placeholder: 'Party providing indemnification' },
      { name: 'indemnifiedParty', label: 'Indemnified Party', type: 'text', required: true, placeholder: 'Party being indemnified' },
      { name: 'scope', label: 'Scope of Indemnification', type: 'select', options: ['Third-party claims only', 'All claims and damages', 'Specific violations only', 'Gross negligence and willful misconduct'] },
      { name: 'notice', label: 'Notice Period (days)', type: 'number', required: true },
      { name: 'defense', label: 'Defense Obligations', type: 'select', options: ['Indemnifying party controls defense', 'Mutual cooperation required', 'Indemnified party may participate'] }
    ],
    template: `**INDEMNIFICATION**

**1. Indemnification Obligation:** {{indemnifyingParty}} shall indemnify, defend, and hold harmless {{indemnifiedParty}} and its officers, directors, employees, agents, and representatives from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from or relating to {{scope}}.

**2. Notice:** {{indemnifiedParty}} shall provide {{indemnifyingParty}} with prompt written notice of any claim for which indemnification is sought, provided that failure to provide such notice shall not relieve {{indemnifyingParty}} of its indemnification obligations except to the extent it is materially prejudiced by such failure. Such notice shall be provided within {{notice}} days of becoming aware of the claim.

**3. Defense:** {{defense}}. {{indemnifyingParty}} shall have the right to select counsel of its choice to defend any indemnified claim, subject to {{indemnifiedParty}}'s reasonable approval.

**4. Settlement:** {{indemnifyingParty}} may not settle any claim without the prior written consent of {{indemnifiedParty}}, which consent shall not be unreasonably withheld, unless such settlement completely releases {{indemnifiedParty}} from all liability and contains no admission of wrongdoing.

**5. Cooperation:** {{indemnifiedParty}} shall cooperate with {{indemnifyingParty}} in the defense of any claim and provide reasonable assistance at {{indemnifyingParty}}'s expense.

**6. Mitigation:** {{indemnifiedParty}} shall take reasonable steps to mitigate any damages for which indemnification is sought.

**7. Survival:** This indemnification provision shall survive the termination of this agreement.`
  },
  {
    id: 'termination',
    name: 'Termination Clause',
    category: 'Contract Management',
    description: 'Contract termination rights and procedures',
    icon: AlertCircle,
    fields: [
      { name: 'party1', label: 'First Party', type: 'text', required: true, placeholder: 'Party Name' },
      { name: 'party2', label: 'Second Party', type: 'text', required: true, placeholder: 'Party Name' },
      { name: 'convenientNotice', label: 'Termination for Convenience Notice (days)', type: 'number', required: true },
      { name: 'causeNotice', label: 'Termination for Cause Notice (days)', type: 'number', required: true },
      { name: 'cureperiod', label: 'Cure Period (days)', type: 'number', required: true },
      { name: 'survivalClauses', label: 'Surviving Provisions', type: 'textarea', placeholder: 'List sections that survive termination' }
    ],
    template: `**TERMINATION**

**1. Term:** This agreement shall continue in effect until terminated in accordance with the provisions herein.

**2. Termination for Convenience:** Either {{party1}} or {{party2}} may terminate this agreement at any time without cause by providing {{convenientNotice}} days' written notice to the other party.

**3. Termination for Cause:** Either party may terminate this agreement immediately upon written notice if the other party:
   a) Materially breaches this agreement and fails to cure such breach within {{cureperiod}} days after receiving written notice thereof;
   b) Becomes insolvent, files for bankruptcy, or makes an assignment for the benefit of creditors;
   c) Ceases to conduct business in the ordinary course; or
   d) Violates any law or regulation that materially affects its performance under this agreement.

**4. Notice of Termination:** Any notice of termination must be in writing and delivered in accordance with the notice provisions of this agreement. For termination for cause, the terminating party must provide at least {{causeNotice}} days' written notice specifying the grounds for termination.

**5. Effect of Termination:** Upon termination of this agreement:
   a) All rights and obligations of the parties shall cease, except as expressly provided herein;
   b) Each party shall return or destroy all Confidential Information of the other party;
   c) All accrued payment obligations shall become immediately due and payable;
   d) Neither party shall have any further liability to the other, except for liabilities accrued prior to termination.

**6. Survival:** The following provisions shall survive termination of this agreement: {{survivalClauses}}.

**7. No Penalty:** Termination of this agreement shall not constitute a penalty and shall not affect any claim for damages or other remedies that either party may have.`
  },
  {
    id: 'limitation',
    name: 'Limitation of Liability',
    category: 'Risk Management',
    description: 'Liability limitations and damage exclusions',
    icon: Shield,
    fields: [
      { name: 'party1', label: 'First Party', type: 'text', required: true, placeholder: 'Party Name' },
      { name: 'party2', label: 'Second Party', type: 'text', required: true, placeholder: 'Party Name' },
      { name: 'capType', label: 'Liability Cap Type', type: 'select', options: ['Fixed dollar amount', 'Percentage of contract value', 'Fees paid in preceding 12 months', 'No monetary cap'] },
      { name: 'capAmount', label: 'Cap Amount', type: 'text', placeholder: 'Enter amount or percentage' },
      { name: 'carveouts', label: 'Carve-outs', type: 'select', options: ['Standard carve-outs', 'Include IP infringement', 'Include confidentiality breaches', 'Include death/personal injury', 'Custom carve-outs'] }
    ],
    template: `**LIMITATION OF LIABILITY**

**1. Disclaimer of Consequential Damages:** IN NO EVENT SHALL EITHER {{party1}} OR {{party2}} BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, OR USE, WHETHER IN AN ACTION IN CONTRACT, TORT, OR OTHERWISE, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

**2. Limitation of Liability:** EXCEPT AS OTHERWISE PROVIDED IN THIS AGREEMENT, THE TOTAL LIABILITY OF EACH PARTY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THIS AGREEMENT SHALL NOT EXCEED {{capAmount}}.

**3. Carve-outs:** The limitations set forth in this section shall not apply to:
   a) Obligations under any confidentiality or non-disclosure provisions;
   b) Intellectual property infringement claims;
   c) Gross negligence or willful misconduct;
   d) Death or personal injury caused by negligence;
   e) Fraud or fraudulent misrepresentation;
   f) Violations of applicable law;
   g) {{carveouts}}.

**4. Basis of Bargain:** THE PARTIES ACKNOWLEDGE THAT THE LIMITATIONS OF LIABILITY SET FORTH IN THIS SECTION ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN AND THAT THE PARTIES WOULD NOT ENTER INTO THIS AGREEMENT WITHOUT THESE LIMITATIONS.

**5. Failure of Essential Purpose:** THE LIMITATIONS OF LIABILITY SET FORTH IN THIS SECTION SHALL APPLY EVEN IF ANY LIMITED REMEDY FAILS OF ITS ESSENTIAL PURPOSE.

**6. Applicable Law:** Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitations may not apply to the extent prohibited by applicable law.`
  },
  {
    id: 'ip',
    name: 'Intellectual Property',
    category: 'Intellectual Property',
    description: 'IP ownership, licensing, and protection clauses',
    icon: BookOpen,
    fields: [
      { name: 'licensor', label: 'Licensor', type: 'text', required: true, placeholder: 'IP Owner' },
      { name: 'licensee', label: 'Licensee', type: 'text', required: true, placeholder: 'License Recipient' },
      { name: 'licenseType', label: 'License Type', type: 'select', options: ['Exclusive', 'Non-exclusive', 'Sole license'] },
      { name: 'scope', label: 'Scope', type: 'textarea', required: true, placeholder: 'Description of licensed IP' },
      { name: 'territory', label: 'Territory', type: 'select', options: ['Worldwide', 'United States', 'North America', 'Europe', 'Asia', 'Specific countries'] },
      { name: 'field', label: 'Field of Use', type: 'text', placeholder: 'Specific field or industry' }
    ],
    template: `**INTELLECTUAL PROPERTY**

**1. Grant of License:** {{licensor}} hereby grants to {{licensee}} a {{licenseType}} license to use, reproduce, and distribute the intellectual property described as: {{scope}}.

**2. Scope of License:** The license granted herein is limited to {{field}} and is restricted to the territory of {{territory}}.

**3. Reservation of Rights:** {{licensor}} reserves all rights not expressly granted to {{licensee}} under this agreement. No implied licenses are granted.

**4. Ownership:** {{licensor}} retains all right, title, and interest in and to the licensed intellectual property. {{licensee}} acknowledges that no title to or ownership of the intellectual property is transferred to {{licensee}}.

**5. Restrictions:** {{licensee}} shall not:
   a) Reverse engineer, decompile, or disassemble the intellectual property;
   b) Remove or alter any proprietary notices or labels;
   c) Sublicense the intellectual property without prior written consent;
   d) Use the intellectual property in any manner that violates applicable laws.

**6. Improvements:** Any improvements, modifications, or derivative works made by {{licensee}} shall be owned by {{licensor}}, and {{licensee}} hereby assigns all rights therein to {{licensor}}.

**7. Infringement:** {{licensee}} shall promptly notify {{licensor}} of any suspected infringement of the licensed intellectual property and shall cooperate in any enforcement actions.

**8. Warranty:** {{licensor}} warrants that it has the right to grant the license herein and that the use of the intellectual property as licensed will not infringe any third-party rights.`
  },
  {
    id: 'payment',
    name: 'Payment Terms',
    category: 'Financial',
    description: 'Payment schedules, methods, and late payment provisions',
    icon: DollarSign,
    fields: [
      { name: 'payer', label: 'Payer', type: 'text', required: true, placeholder: 'Party making payment' },
      { name: 'payee', label: 'Payee', type: 'text', required: true, placeholder: 'Party receiving payment' },
      { name: 'amount', label: 'Payment Amount', type: 'text', required: true, placeholder: 'e.g., $10,000 or as specified in Schedule A' },
      { name: 'schedule', label: 'Payment Schedule', type: 'select', options: ['Upon execution', 'Net 30', 'Net 60', 'Monthly', 'Quarterly', 'Annually', 'Upon delivery', 'Milestone-based'] },
      { name: 'method', label: 'Payment Method', type: 'select', options: ['Wire transfer', 'Check', 'ACH transfer', 'Credit card', 'Electronic payment', 'As mutually agreed'] },
      { name: 'lateFee', label: 'Late Fee Rate (%)', type: 'number', placeholder: '1.5' },
      { name: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'Other'] }
    ],
    template: `**PAYMENT TERMS**

**1. Payment Obligation:** {{payer}} shall pay {{payee}} the amount of {{amount}} in {{currency}}.

**2. Payment Schedule:** Payment shall be made {{schedule}} from the date of invoice or as otherwise specified herein.

**3. Payment Method:** All payments shall be made by {{method}} to the account designated by {{payee}} in writing.

**4. Invoicing:** {{payee}} shall submit invoices to {{payer}} containing sufficient detail to substantiate the charges. All invoices must include:
   a) Invoice number and date
   b) Description of goods or services provided
   c) Amount due and payment terms
   d) {{payee}}'s tax identification number

**5. Late Payment:** If any payment is not received when due, {{payer}} shall pay a late fee of {{lateFee}}% per month (or the maximum rate permitted by law, whichever is less) on the overdue amount until paid in full.

**6. Disputed Amounts:** {{payer}} may dispute any invoice by providing written notice within 30 days of receipt, specifying the basis for the dispute. Undisputed portions shall be paid when due.

**7. Taxes:** Each party shall be responsible for its own taxes arising from or relating to this agreement. All payments shall be made without deduction for taxes unless required by law.

**8. Set-off:** {{payer}} may set off any amounts owed by {{payee}} against amounts due under this agreement, provided written notice is given.

**9. Currency:** All amounts are stated and shall be paid in {{currency}}. If payment is made in another currency, it shall be converted at the exchange rate published by [specify source] on the payment due date.`
  },
  {
    id: 'force-majeure',
    name: 'Force Majeure Clause',
    category: 'Risk Management',
    description: 'Protection against unforeseeable circumstances and acts of God',
    icon: Zap,
    fields: [
      { name: 'party1', label: 'First Party', type: 'text', required: true, placeholder: 'Party Name' },
      { name: 'party2', label: 'Second Party', type: 'text', required: true, placeholder: 'Party Name' },
      { name: 'noticeperiod', label: 'Notice Period (days)', type: 'number', required: true, placeholder: '10' },
      { name: 'terminationperiod', label: 'Termination Period (days)', type: 'number', required: true, placeholder: '90' },
      { name: 'specificEvents', label: 'Additional Specific Events', type: 'textarea', placeholder: 'List any specific events relevant to your industry' }
    ],
    template: `**FORCE MAJEURE**

**1. Definition:** "Force Majeure Event" means any event or circumstance beyond the reasonable control of the affected party, including but not limited to:
   a) Acts of God, natural disasters, earthquakes, floods, hurricanes, storms, or other weather conditions;
   b) War, terrorism, civil unrest, riots, or other acts of violence;
   c) Government actions, laws, regulations, or court orders;
   d) Labor disputes, strikes, or lockouts;
   e) Epidemics, pandemics, or public health emergencies;
   f) Fire, explosion, or other industrial accidents;
   g) Failure of public utilities or transportation systems;
   h) Cyber attacks or system failures beyond reasonable control;
   i) {{specificEvents}}.

**2. Effect of Force Majeure:** If either {{party1}} or {{party2}} is prevented from or delayed in performing any obligation under this agreement due to a Force Majeure Event, such party's performance shall be excused for the duration of the Force Majeure Event, provided that:
   a) The affected party gives written notice to the other party within {{noticeperiod}} days of becoming aware of the Force Majeure Event;
   b) The affected party uses reasonable efforts to mitigate the effects of the Force Majeure Event;
   c) The affected party resumes performance as soon as reasonably possible after the Force Majeure Event ceases.

**3. Notice Requirements:** The notice shall describe:
   a) The nature and extent of the Force Majeure Event;
   b) The obligations affected and the expected duration of the delay;
   c) The steps being taken to remedy the situation;
   d) The expected date when performance will resume.

**4. Mitigation:** The affected party shall use commercially reasonable efforts to:
   a) Minimize the impact of the Force Majeure Event;
   b) Find alternative means of performance;
   c) Resume normal performance as quickly as possible.

**5. Termination:** If a Force Majeure Event continues for more than {{terminationperiod}} consecutive days, either party may terminate this agreement upon written notice to the other party.

**6. No Liability:** Neither party shall be liable for any failure or delay in performance due to a Force Majeure Event, including any consequential, incidental, or special damages.

**7. Payment Obligations:** Force Majeure Events shall not excuse payment obligations for services already performed or goods already delivered.`
  },
  {
    id: 'amendments',
    name: 'Amendments Clause',
    category: 'Contract Management',
    description: 'Procedures for modifying and amending the agreement',
    icon: Edit,
    fields: [
      { name: 'party1', label: 'First Party', type: 'text', required: true, placeholder: 'Party Name' },
      { name: 'party2', label: 'Second Party', type: 'text', required: true, placeholder: 'Party Name' },
      { name: 'writtenRequirement', label: 'Written Requirement', type: 'select', options: ['Must be in writing and signed', 'Must be in writing only', 'May be oral if confirmed in writing', 'Electronic signatures acceptable'] },
      { name: 'approvalProcess', label: 'Approval Process', type: 'select', options: ['Mutual written consent', 'Majority approval required', 'Specific authorized representatives', 'Board approval required'] },
      { name: 'noticeperiod', label: 'Notice Period for Changes (days)', type: 'number', placeholder: '30' }
    ],
    template: `**AMENDMENTS AND MODIFICATIONS**

**1. Amendment Procedure:** This agreement may be amended, modified, or supplemented only by {{writtenRequirement}} by both {{party1}} and {{party2}}.

**2. Authorization:** Amendments must be approved through {{approvalProcess}}. No amendment shall be effective unless executed by duly authorized representatives of both parties.

**3. Written Requirement:** No oral modifications, amendments, or waivers of any provision of this agreement shall be effective. Any purported oral modification shall be null and void.

**4. Notice of Proposed Changes:** Either party proposing an amendment shall provide written notice to the other party at least {{noticeperiod}} days prior to the proposed effective date, unless both parties agree to a shorter notice period.

**5. Form of Amendment:** All amendments shall:
   a) Reference this agreement and the specific provisions being amended;
   b) Set forth the exact text of the amendment;
   c) Specify the effective date of the amendment;
   d) Be signed by authorized representatives of both parties;
   e) Be attached to and made part of this agreement.

**6. Integration:** Each amendment shall be deemed incorporated into this agreement and shall be binding upon the parties and their successors and assigns.

**7. Conflicting Terms:** In the event of any conflict between the terms of this agreement and any amendment, the amendment shall control with respect to the specific subject matter addressed therein.

**8. No Implied Amendments:** The failure of either party to enforce any provision of this agreement shall not be construed as an amendment or waiver of such provision or the right to enforce such provision.

**9. Course of Dealing:** No course of dealing between the parties shall be deemed to modify this agreement unless such modification complies with the amendment procedures set forth herein.

**10. Counterparts:** Amendments may be executed in counterparts, including electronic counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument.`
  },
  {
    id: 'severability',
    name: 'Severability Clause',
    category: 'Contract Management',
    description: 'Ensures contract validity even if some provisions are unenforceable',
    icon: Scissors,
    fields: [
      { name: 'party1', label: 'First Party', type: 'text', required: true, placeholder: 'Party Name' },
      { name: 'party2', label: 'Second Party', type: 'text', required: true, placeholder: 'Party Name' },
      { name: 'reformationApproach', label: 'Reformation Approach', type: 'select', options: ['Court may reform invalid provisions', 'Replace with closest valid provision', 'Parties will negotiate replacement', 'Automatic deletion only'] },
      { name: 'materialityTest', label: 'Materiality Test', type: 'select', options: ['Agreement continues unless provision is material to entire agreement', 'Agreement continues unless core purpose is frustrated', 'Agreement continues in all cases', 'Custom materiality standard'] }
    ],
    template: `**SEVERABILITY**

**1. Severability of Provisions:** If any provision of this agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be deemed severed from this agreement, and the remaining provisions shall continue in full force and effect.

**2. Reformation:** {{reformationApproach}}. The parties agree to cooperate in good faith to replace any invalid provision with a valid provision that most closely approximates the intent and economic effect of the invalid provision.

**3. Materiality Standard:** {{materialityTest}}. If the invalid provision is determined to be material to the overall agreement such that its removal would frustrate the fundamental purpose of the agreement, then either {{party1}} or {{party2}} may terminate this agreement upon written notice.

**4. Partial Invalidity:** If only a portion of any provision is held invalid or unenforceable, the remainder of such provision, and all other provisions of this agreement, shall remain in full force and effect.

**5. Judicial Modification:** If any provision of this agreement is deemed overly broad or restrictive, the parties request that the court modify such provision to the minimum extent necessary to make it enforceable, rather than declaring it wholly invalid.

**6. Savings Clause:** To the extent that any provision of this agreement is deemed unenforceable due to its scope, duration, or geographic area, such provision shall be deemed modified to the minimum extent necessary to make it enforceable under applicable law.

**7. Notice of Invalidity:** If either party becomes aware that any provision of this agreement may be invalid or unenforceable, such party shall promptly notify the other party in writing.

**8. Continued Performance:** Pending any judicial determination of invalidity, both parties shall continue to perform their obligations under this agreement to the extent possible.

**9. No Waiver:** The invalidity or unenforceability of any provision shall not constitute a waiver of any other provision of this agreement.

**10. Entire Agreement Preservation:** The parties intend that this agreement be enforced to the fullest extent possible under applicable law, and that any invalid provisions be severed only to the minimum extent necessary to preserve the validity of the remainder of the agreement.`
  }
];

function App() {
  const [selectedClause, setSelectedClause] = useState<ClauseTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedClause, setGeneratedClause] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = Array.from(new Set(clauseTemplates.map(template => template.category)));

  const filteredTemplates = clauseTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFormChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateClause = () => {
    if (!selectedClause) return;

    let clause = selectedClause.template;
    
    // Replace placeholders with form data
    Object.entries(formData).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      clause = clause.replace(regex, value || `[${key}]`);
    });

    setGeneratedClause(clause);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedClause);
  };

  const resetForm = () => {
    setSelectedClause(null);
    setFormData({});
    setGeneratedClause('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Legal Clause Generator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Professional Legal Document Assistant</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedClause ? (
          <div>
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search clause templates..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clause Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer border border-gray-200"
                  onClick={() => setSelectedClause(template)}
                >
                  <div className="flex items-center mb-4">
                    <template.icon className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      <span className="text-sm text-blue-600 font-medium">{template.category}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <FileText className="h-4 w-4 mr-1" />
                    {template.fields.length} fields required
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No clause templates found matching your search.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <selectedClause.icon className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">{selectedClause.name}</h2>
                </div>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← Back to Templates
                </button>
              </div>

              <form className="space-y-4">
                {selectedClause.fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {field.type === 'text' && (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFormChange(field.name, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'textarea' && (
                      <textarea
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFormChange(field.name, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'select' && (
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFormChange(field.name, e.target.value)}
                      >
                        <option value="">Select option...</option>
                        {field.options?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                    
                    {field.type === 'number' && (
                      <input
                        type="number"
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFormChange(field.name, e.target.value)}
                      />
                    )}
                    
                    {field.type === 'date' && (
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData[field.name] || ''}
                        onChange={(e) => handleFormChange(field.name, e.target.value)}
                      />
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={generateClause}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Generate Clause
                </button>
              </form>
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Generated Clause</h3>
                {generatedClause && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Copy
                  </button>
                )}
              </div>
              
              {generatedClause ? (
                <div className="prose max-w-none">
                  <div className="bg-gray-50 p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap">
                    {generatedClause}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Fill out the form and click "Generate Clause" to see your legal clause here.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;