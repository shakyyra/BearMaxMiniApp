import { FormConfig } from '../types/forms';

export const FORM_SCHEMAS = {
  masterclass: {
    formId: 'masterclass',
    steps: [
      {
        stepId: 'details',
        title: 'Форма мастер-класса',
        subtitle: 'Для отправки заявки нужно заполнить все поля',
        buttonText: 'Отправить заявку',
        fields: [
          {
            name: 'email',
            type: 'email',
            placeholder: 'E-mail',
            defaultValue: '',
            validation: {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Введите корректный email',
            },
          },
          {
            name: 'city',
            type: 'select',
            placeholder: 'Выберете город проживания',
            defaultValue: '',
            validation: {
              required: true,
              message: 'Выберите город',
            },
            options: [
              { value: 'ekb', label: 'Екатеринбург' },
              { value: 'msk', label: 'Москва' },
              { value: 'spb', label: 'Санкт-Петербург' },
              { value: 'nsk', label: 'Новосибирск' },
            ],
          },
          {
            name: 'education',
            type: 'select',
            placeholder: 'Образование',
            defaultValue: '',
            validation: {
              required: true,
              message: 'Выберите образование',
            },
            options: [
              { value: 'higher', label: 'Высшее' },
              { value: 'secondary', label: 'Среднее специальное' },
              { value: 'incomplete', label: 'Неполное высшее' },
            ],
          },
          {
            name: 'description',
            type: 'textarea',
            placeholder: 'Опишите ваш мастер-класс',
            defaultValue: '',
            rows: 5,
            validation: {
              required: true,
              minLength: 10,
              message: 'Введите описание (минимум 10 символов)',
            },
          },
        ],
      },
    ],
  } as FormConfig<'form' | 'details'>,
  
  mentoring: {
    formId: 'mentoring',
    steps: [
      {
        stepId: 'details',
        title: 'Форма будущего наставника',
        subtitle: 'Для отправки заявки нужно заполнить все поля',
        buttonText: 'Отправить заявку',
        fields: [
          {
            name: 'email',
            type: 'email',
            placeholder: 'E-mail',
            defaultValue: '',
            validation: {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Введите корректный email',
            },
          },
          {
            name: 'city',
            type: 'select',
            placeholder: 'Выберете город проживания',
            defaultValue: '',
            validation: {
              required: true,
              message: 'Выберите город',
            },
            options: [
              { value: 'ekb', label: 'Екатеринбург' },
              { value: 'msk', label: 'Москва' },
              { value: 'spb', label: 'Санкт-Петербург' },
              { value: 'nsk', label: 'Новосибирск' },
            ],
          },
          {
            name: 'education',
            type: 'select',
            placeholder: 'Образование',
            defaultValue: '',
            validation: {
              required: true,
              message: 'Выберите образование',
            },
            options: [
              { value: 'higher', label: 'Высшее' },
              { value: 'secondary', label: 'Среднее специальное' },
              { value: 'incomplete', label: 'Неполное высшее' },
            ],
          },
          {
            name: 'description',
            type: 'textarea',
            placeholder: 'Расскажите о своем опыте наставничества',
            defaultValue: '',
            rows: 5,
            validation: {
              required: true,
              minLength: 10,
              message: 'Введите описание (минимум 10 символов)',
            },
          },
        ],
      },
    ],
  } as FormConfig<'form' | 'details'>,
} as const;

export type FormSchemaKey = keyof typeof FORM_SCHEMAS;
