package aplikacija;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Korisnik;
import model.TipKorisnika;

public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		Korisnik korisnik = new Korisnik("korisnik", "korisnik", "16/01/2020", TipKorisnika.KORISNIK , true);
		
			if(korisnik.getKorime().equals(username) && korisnik.getLozinka().equals(password))
			{
				request.getRequestDispatcher("./SuccessServlet").forward(request, response);
				System.out.println("Uspesna prijava");
				return;
			}
			else
			{
				request.getRequestDispatcher("./FailServlet").forward(request, response);
				System.out.println("Pogresna prijava");
				return;
			}
		
	}

}
