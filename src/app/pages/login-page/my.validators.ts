import {FormControl} from "@angular/forms";

export class MyValidators {

  static restrictedEmail(control: FormControl): { [key: string]: boolean } {
    if (control.value !== null) { //Проверка control.value !== null используется для предотвращения возможных ошибок
      const email = control.value as string;

      //Проверяется, содержится ли введенный email-адрес в списке запрещенных адресов, Если адрес содержится в этом списке, метод возвращает объект, указывающий на ошибку с именем restrictedEmail.
      if (['v@mail.ru', 'test@mail.ru'].includes(email)) {
        return {restrictedEmail: true};
      }

      const atIndex = email.lastIndexOf('@');

      if (atIndex >= 0) { // Проверяем, был ли найден символ '@'
        const domain = email.slice(atIndex + 1); // // Если символ '@' был найден, извлекаем доменное имя из email
        const restrictedDomains = ['mail.ru', 'example.com', 'yourdomain.com']; //Создаем массив запрещенных емейлов доменов

        if (restrictedDomains.includes(domain)) { // Проверяем, содержится ли доменное имя в списке ограниченных доменов
          return {restrictedEmail: true}; // Если доменное имя содержится в списке ограниченных доменов, возвращаем ошибку
        }
      }

      // это регулярное выражение проверяет, соответствует ли значение email-адреса заданному формату. Если значение не соответствует этому формату, то есть если email-адрес имеет неправильную структуру, метод возвращает объект с ошибкой invalidEmail: true, указывающий на то, что введен некорректный email-адрес.
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return {invalidEmail: true};
      }
    }

// Когда метод restrictedEmail завершает свою работу, и все проверки пройдены успешно (т.е. введенный email-адрес не содержится в списке запрещенных, соответствует формату и не является ограниченным доменом), он возвращает пустой объект {}.
// Этот пустой объект является сигналом для Angular Forms о том, что введенное значение email-адреса является допустимым и не содержит ошибок валидации.
    return {};
  }
}
